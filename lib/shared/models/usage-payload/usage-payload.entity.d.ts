/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率上拋資料實體
 * @CREATE Friday, 5th November 2021 8:23:27 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { UsagePayload } from './usage-payload.model';
/**
 * 使用率上拋資料實體
 */
export declare class UsagePayloadEntity implements UsagePayload {
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
    /**
     * @param payload 使用率上拋資料
     */
    constructor(payload?: Partial<UsagePayload>);
}
