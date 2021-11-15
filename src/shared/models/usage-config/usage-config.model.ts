/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率服務設定檔資料模型
 * @CREATE Friday, 5th November 2021 2:46:16 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 使用率服務設定檔資料模型
 */
export interface UsageConfig {
  /**
   * ElasticSearch Hosts
   */
  hosts?: string;
  /**
   * ElasticSearch 使用率資料 Index
   */
  index?: string;
  /**
   * ElasticSearch 使用率資料 Type
   */
  type?: string;
  /**
   * 系統 ID
   */
  systemId: string;
  /**
   * 廠別
   */
  plant: string[];
  /**
   * 使用率單位說明
   */
  unit: string;
  /**
   * 使用率排程設定
   */
  cron: string;
  /**
   * 使用率上拋端口
   */
  publishedApi: string;
  /**
   * 重新拋送使用率的 API 端口
   */
  port?: number;
}
