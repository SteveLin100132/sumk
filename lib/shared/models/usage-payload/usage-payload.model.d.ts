/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率上拋資料模型
 * @CREATE Friday, 5th November 2021 8:15:56 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/**
 * 使用率上拋資料模型
 */
export interface UsagePayload {
    /**
     * 時間戳
     */
    datadate: string;
    /**
     * 系統 ID
     */
    systemid: string;
    /**
     * 廠別
     */
    plant: string;
    /**
     * 實際使用次數
     */
    actual: number;
    /**
     * 目標使用次數
     */
    target: number;
    /**
     * 是否達標，0: 未達標；1: 達標
     */
    status: number;
    /**
     * 單位說明
     */
    cmpunitdesc: string;
    /**
     * 時間戳(Epochtime)
     */
    uploadtime: number;
}
