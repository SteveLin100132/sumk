/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用次數資料模型
 * @CREATE Friday, 5th November 2021 8:12:57 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 使用次數資料模型
 */
export interface UsageCount {
  /**
   * 廠別
   */
  plant: string;
  /**
   * 使用次數
   */
  count: number;
}
