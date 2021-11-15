"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryConditionBuilder = void 0;
const models_1 = require("./../../models");
/**
 * 使用率查詢條件建構者
 */
class QueryConditionBuilder {
    constructor() {
        /**
         * 使用率上拋資料
         */
        this._usage = new models_1.UsagePayloadEntity();
        /**
         * 查詢開始時間
         */
        this._start = new Date().getTime();
        /**
         * 查詢結束時間
         */
        this._end = new Date().getTime();
    }
    /**
     * 設定使用率上拋資料
     *
     * @method public
     * @param usage 使用率上拋資料
     * @return 回傳物件本身
     */
    setUsage(usage) {
        this._usage = usage;
        return this;
    }
    /**
     * 設定查詢起訖時間
     *
     * @method public
     * @param start 查詢開始時間
     * @param end   查詢結束時間
     * @return 回傳物件本身
     */
    setBetween(start, end) {
        this._start = start;
        this._end = end;
        return this;
    }
    /**
     * 建構資料
     *
     * @method public
     * @return 回傳建構出的資料
     */
    build() {
        return {
            systemid: this._usage.systemid,
            plant: this._usage.plant,
            start: this._start,
            end: this._end,
        };
    }
}
exports.QueryConditionBuilder = QueryConditionBuilder;
