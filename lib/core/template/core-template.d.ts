/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 抽象核心範本
 * @CREATE Monday, 8th November 2021 3:38:53 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 抽象核心範本
 */
export interface CoreTemplate<P = any> {
    /**
     * 取得標準值
     *
     * @method public
     * @param payload 使用率數據
     * @param start   查詢開始時間
     * @param end     查詢結束時間
     * @return 回傳標準值
     */
    target(payload: P, start: number, end: number): Promise<P>;
}
