/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 客製使用率查詢範例
 * @CREATE Monday, 8th November 2021 3:18:16 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Log4js } from 'wistroni40-backend-utility';
import {
  CustomUsage,
  UsageCount,
  UsagePayload,
  UsageTemplate,
  UsageType,
} from '../lib';

/**
 * 客製使用率服務
 */
export class UsageService extends UsageTemplate implements CustomUsage {
  /**
   * 使用率類型
   */
  public type: UsageType = 'Custom';

  constructor() {
    super({
      systemId: 'SYSTEM_ID',
      plant: ['PLANT_CODE'],
      unit: 'USAGE_UNIT',
      publishedApi: 'http://usage.publish.port/',
    });
  }

  /**
   * 客製查詢當日使用率
   *
   * @method public
   * @param payload 使用率數據
   * @param start   觸發開始時間
   * @param ernd    觸發結束時間
   * @return 回傳使用率數據
   */
  public async query(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsageCount> {
    return { plant: payload.plant, count: 15 };
  }

  /**
   * 取得標準值
   *
   * @method public
   * @param payload 打包後的使用率數據
   * @param start   查詢開始時間
   * @param end     查詢結束時間
   * @return 回傳標準值
   */
  public async target(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsagePayload> {
    payload.target = 10;
    return payload;
  }
}

const logger = new Log4js('APP');
const service = new UsageService();
service
  .setSchedule('0 0 0 * * *')
  .subscribe(res => logger.debug(JSON.stringify(res)));
service.execute().subscribe(res => logger.debug(JSON.stringify(res)));
