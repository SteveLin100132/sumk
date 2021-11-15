/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率查詢條件建構者
 * @CREATE Monday, 8th November 2021 3:05:08 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { DataBuilder } from './../../../core';
import { QueryCondition } from './../../executor';
import { UsagePayload } from './../../models';
/**
 * 使用率查詢條件建構者
 */
export declare class QueryConditionBuilder implements DataBuilder<QueryCondition> {
    /**
     * 使用率上拋資料
     */
    private _usage;
    /**
     * 查詢開始時間
     */
    private _start;
    /**
     * 查詢結束時間
     */
    private _end;
    /**
     * 設定使用率上拋資料
     *
     * @method public
     * @param usage 使用率上拋資料
     * @return 回傳物件本身
     */
    setUsage(usage: UsagePayload): this;
    /**
     * 設定查詢起訖時間
     *
     * @method public
     * @param start 查詢開始時間
     * @param end   查詢結束時間
     * @return 回傳物件本身
     */
    setBetween(start: number, end: number): this;
    /**
     * 建構資料
     *
     * @method public
     * @return 回傳建構出的資料
     */
    build(): QueryCondition;
}
