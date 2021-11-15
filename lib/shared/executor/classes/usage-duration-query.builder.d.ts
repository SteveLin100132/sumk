/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用持續時間查詢語句建構者
 * @CREATE Monday, 8th November 2021 3:01:39 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import * as esb from 'elastic-builder';
import { ElasticBuilder } from 'wistroni40-backend-utility';
import { QueryCondition } from './../models';
/**
 * 使用持續時間查詢語句建構者
 */
export declare class UsageDurationQueryBuilder implements ElasticBuilder {
    private _condition;
    /**
     * @param _condition 查詢條件
     */
    constructor(_condition: QueryCondition);
    /**
     * 建構查詢語句
     *
     * @method public
     * @return 回傳查詢語句
     */
    build(): esb.RequestBodySearch;
}
