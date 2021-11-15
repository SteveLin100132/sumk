/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 查詢條件資料模型
 * @CREATE Monday, 8th November 2021 2:39:28 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 查詢條件資料模型
 */
export interface QueryCondition {
  /**
   * 系統 ID
   */
  systemid: string;
  /**
   * 廠別
   */
  plant: string;
  /**
   * 查詢開始時間
   */
  start: number;
  /**
   * 查詢結束時間
   */
  end: number;
}
