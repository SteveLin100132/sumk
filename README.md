# wistroni40-sumk

# Install

```
npm i wistroni40-sumk --save
```

# Table of Contents

- [Feature](#feature)
- [Usage](#usage)
- [Example](#example)
- [API](#api)

# Feature

- 提供使用率上拋服務開發模板
  - 內建針對特定系統 By 廠別查詢使用次數
  - 內建針對特定系統 By 廠別查詢使用持續時間
  - 可客製使用率的查詢方式
- 提供重新上拋使用率的 API，預設端口 3010
  - 重新上拋昨日的使用率
  - 重新上拋特定時間的使用率
  - 重新上拋特定時間範圍的使用率
  - 重新上拋昨日特定廠別的使用率
  - 重新上拋特定時間特定廠別的使用率
  - 重新上拋特定時間範圍特定廠別的使用率

# Usage

## 內建使用率次數或持續時間服務用法

### Step 1

繼承 `UsageTemplate`，並實作屬性 `type`，該屬性提供 `Count`, `Duration` 及
`Custom`

- Count: 可針對特定系統 By 廠別查詢使用次數
- Duration: 可針對特定系統 By 廠別查詢使用持續時間
- Custom: 若系統使用率並非保存在 SUMK 系統，或以上的查詢方式不符需求，可設定
  Custom 進行客製，客製所需實作內容請參考 Step #

```typescript
import { UsageTemplate, UsageType } from 'wistroni40-sumk';

export class UsageService extends UsageTemplate {
  public type: UsageType = 'Count';
  // Other Step ...
}
```

#### Property type

| Property | Type      | Description                                     |
| -------- | --------- | ----------------------------------------------- |
| type     | UsageType | 使用率查詢方式，`Count`, `Duration` 及 `Custom` |

### Step 2

提供使用率範本所需的配置

```typescript
import { UsageTemplate } from 'wistroni40-sumk';

export class UsageService extends UsageTemplate {
  // ...
  constructor() {
    super({
      hosts: 'http://elastic.host01:9200/,http://elastic.host02:9200/',
      index: 'sumk_data_index_*',
      type: 'sumk_data_type_*',
      systemId: 'SYSTEM_ID',
      plant: ['PLANT_CODE'],
      unit: 'USAGE_UNIT',
      cron: '0 0 1 * * *',
      publishedApi: 'http://usage.publish.port/',
    });
  }
  // Other Step ...
}
```

#### Configuration

UsageConfig

| Property     | Type                    | Description                                                                                 |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------------- |
| host         | string &#124; undefined | SUMK 各系統使用紀錄 ElasticSearch Host，若使用記錄非保存在 SUMK，可不設定                   |
| index        | string &#124; undefined | SUMK 各系統使用紀錄 ElasticSearch Index，若使用記錄非保存在 SUMK，可不設定                  |
| type         | string &#124; undefined | SUMK 各系統使用紀錄 ElasticSearch Type，若沒有額外的 Type 或使用記錄非保存在 SUMK，可不設定 |
| systemId     | string                  | 該系統的系統 ID                                                                             |
| plant        | string[]                | 該系統 Rollout 的廠別                                                                       |
| unit         | string                  | 使用率統計單位                                                                              |
| cron         | string                  | 上拋使用率的排程時間設定                                                                    |
| publishedApi | string                  | 使用率數據上拋端口                                                                          |
| port         | string                  | 使用率上拋服務底層 API 端口                                                                 |

### Step 3

實作方法 `target`，以提供使用率達成的目標值，** 須將目標值回寫至使用率數據的
Payload **

```typescript
import { UsageTemplate, UsagePayload } from 'wistroni40-sumk';

export class UsageService extends UsageTemplate {
  // ...
  public async target(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsagePayload> {
    payload.target = 10;
    return payload;
  }
}
```

#### Method target

| Property | Type         | Description        |
| -------- | ------------ | ------------------ |
| payload  | UsagePayload | 打包後的使用率數據 |
| start    | number       | 查詢開始時間       |
| end      | number       | 查詢結束時間       |

#### UsagePayload

| Property    | Type   | Description                  |
| ----------- | ------ | ---------------------------- |
| datadate    | string | 時間戳                       |
| systemid    | string | 系統 ID                      |
| plant       | string | 廠別                         |
| actual      | number | 實際使用次數                 |
| target      | number | 目標使用次數                 |
| status      | number | 是否達標，0: 未達標；1: 達標 |
| cmpunitdesc | string | 單位說明                     |
| uploadtime  | number | 時間戳(Epochtime)            |

### Step 4

實例使用率服務並實際調用

```typescript
import { UsageTemplate } from 'wistroni40-sumk';

export class UsageService extends UsageTemplate {
  // ...
}

const service = new UsageService();
service
  .setSchedule('0 0 0 * * *')
  .subscribe(res => logger.debug(JSON.stringify(res)));
service.execute().subscribe(res => logger.debug(JSON.stringify(res)));
```

執行方法有兩種

- `setSchedule`: 提供排成設定，可在特定時間查詢使用率，調用後可訂閱上拋結果，監
  控上拋狀態
- `execute`: 直接執行(可用於測試)，調用後可訂閱上拋結果，監控上拋狀態

## 客製使用率查詢服務用法

### Step 1

1. 繼承 `UsageTemplate`
2. 實作介面 `CustomUsage`
3. 實作屬性 `type`，提供 `Custom`

```typescript
import { CustomUsage, UsageTemplate, UsageType } from 'wistroni40-sumk';

export class UsageService extends UsageTemplate implements CustomUsage {
  public type: UsageType = 'Custom';
  // Other Step ...
}
```

### Step 2

提供使用率範本所需的配置

```typescript
import { CustomUsage, UsageTemplate } from 'wistroni40-sumk';

export class UsageService extends UsageTemplate implements CustomUsage {
  // ...
  constructor() {
    super({
      systemId: 'SYSTEM_ID',
      plant: ['PLANT_CODE'],
      unit: 'USAGE_UNIT',
      cron: '0 0 1 * * *',
      publishedApi: 'http://usage.publish.port/',
    });
  }
  // Other Step ...
}
```

### Step 3

實作方法 `query`，實現客製查詢使用率

```typescript
import {
  CustomUsage,
  UsageCount,
  UsagePayload,
  UsageTemplate,
} from 'wistroni40-sumk';

export class UsageService extends UsageTemplate implements CustomUsage {
  // ...
  public async query(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsageCount> {
    return { plant: payload.plant, count: 15 };
  }
  // Other Step ...
}
```

#### Method query

| Property | Type         | Description        |
| -------- | ------------ | ------------------ |
| payload  | UsagePayload | 打包後的使用率數據 |
| start    | number       | 查詢開始時間       |
| end      | number       | 查詢結束時間       |

#### UsageCount

| Property | Type   | Description |
| -------- | ------ | ----------- |
| plant    | string | 廠別        |
| count    | number | 使用次數    |

### Step 4

實作方法 `target`，以提供使用率達成的目標值，** 須將目標值回寫至使用率數據的
Payload **

```typescript
import { UsageTemplate, UsagePayload } from 'wistroni40-sumk';

export class UsageService extends UsageTemplate {
  // ...
  public async target(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsagePayload> {
    payload.target = 10;
    return payload;
  }
}
```

# Example

- [使用率內建使用次數範例](https://github.com/SteveLin100132/wistroni40-sumk/blob/master/examples/built-in-count-example.ts)
- [使用率內建使用持續時間範例](https://github.com/SteveLin100132/wistroni40-sumk/blob/master/examples/built-in-duration-example.ts)
- [客製使用率查詢範例](https://github.com/SteveLin100132/wistroni40-sumk/blob/master/examples/custom-usage-example.ts)

# API

埋藏於使用率服務底下的 API，提供以下重拋數據的方法

## 重新上拋昨日的使用率

POST /send/yesterday

## 重新上拋特定時間的使用率

POST /send/at?time=1636473600000

### Property type

| Property | Type   | Description                          |
| -------- | ------ | ------------------------------------ |
| time     | number | 要重拋的時間點，使用 13 碼 Epochtime |

## 重新上拋特定時間範圍的使用率

POST /send/between?start=1636473600000&end=1636819200000

### Property type

| Property | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| start    | number | 要重拋的開始時間點，使用 13 碼 Epochtime |
| end      | number | 要重拋的結束時間點，使用 13 碼 Epochtime |

## 重新上拋昨日特定廠別的使用率

POST /send/plant/yesterday?plant=F230

### Property type

| Property | Type   | Description  |
| -------- | ------ | ------------ |
| plant    | string | 要重拋的廠別 |

## 重新上拋特定時間特定廠別的使用率

POST /send/plant/at?time=1636819200000&plant=F230

### Property type

| Property | Type   | Description                          |
| -------- | ------ | ------------------------------------ |
| time     | number | 要重拋的時間點，使用 13 碼 Epochtime |
| plant    | string | 要重拋的廠別                         |

## 重新上拋特定時間範圍特定廠別的使用率

POST /send/plant/between?start=1636473600000&end=1636819200000&plant=F230

### Property type

| Property | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| start    | number | 要重拋的開始時間點，使用 13 碼 Epochtime |
| end      | number | 要重拋的結束時間點，使用 13 碼 Epochtime |
| plant    | string | 要重拋的廠別                             |
