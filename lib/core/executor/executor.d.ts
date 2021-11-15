/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 抽象查詢執行器
 * @CREATE Monday, 8th November 2021 2:33:22 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 抽象查詢執行器
 */
export interface Executor<C = any, R = any> {
    /**
     * 執行查詢
     *
     * @method public
     * @param conditon 查詢條件
     * @return 回傳查詢結果
     */
    exec(conditon: C): Promise<R>;
}
