/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 抽象客製使用率查詢方式範本
 * @CREATE Monday, 8th November 2021 4:44:25 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UsageCount, UsagePayload } from '../models';

/**
 * 抽象客製使用率查詢方式範本
 */
export interface CustomUsage {
  /**
   * 客製查詢當日使用率
   *
   * @method public
   * @param payload 使用率數據
   * @param start   觸發開始時間
   * @param ernd    觸發結束時間
   * @return 回傳使用率數據
   */
  query(payload: UsagePayload, start: number, end: number): Promise<UsageCount>;
}
