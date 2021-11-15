/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率查詢語句建構者
 * @CREATE Thursday, 4th November 2021 6:02:26 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import * as esb from 'elastic-builder';
import { ElasticBuilder } from 'wistroni40-backend-utility';
/**
 * 使用率查詢語句建構者
 */
export declare class UsageQueryBuilder implements ElasticBuilder {
    private _systemId;
    private _plant;
    private _start;
    private _end;
    /**
     * @param _systemId 系統 ID
     * @param _plant    廠別
     * @param _start    查詢開始時間
     * @param _end      查詢結束時間
     */
    constructor(_systemId: string, _plant: string[], _start: number, _end: number);
    /**
     * 建構查詢語句
     *
     * @method public
     * @return 回傳查詢語句
     */
    build(): esb.RequestBodySearch;
}
