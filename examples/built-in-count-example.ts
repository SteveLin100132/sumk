/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率內建使用次數範例
 * @CREATE Monday, 8th November 2021 3:18:16 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Log4js } from 'wistroni40-backend-utility';
import { UsagePayload, UsageTemplate, UsageType } from '../lib';

/**
 * 內建使用次數服務
 */
export class UsageService extends UsageTemplate {
  /**
   * 使用率類型
   */
  public type: UsageType = 'Count';

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
service.execute(1).subscribe(res => logger.debug(JSON.stringify(res)));
