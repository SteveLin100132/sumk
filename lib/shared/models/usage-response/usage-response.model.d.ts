/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率上拋回傳結果資料模型
 * @CREATE Friday, 5th November 2021 2:32:11 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { UsagePayload } from '../usage-payload';
/**
 * 使用率上拋回傳結果資料模型
 */
export interface UsageResponse {
    /**
     * 錯誤訊息
     */
    error: any;
    /**
     * 使用率上拋資料
     */
    result: UsagePayload;
}
