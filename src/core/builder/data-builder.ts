/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 抽象資料建構者
 * @CREATE Monday, 8th November 2021 3:06:10 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 抽象資料建構者
 */
export interface DataBuilder<T = any> {
  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構出的資料
   */
  build(): T;
}
