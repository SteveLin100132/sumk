"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageQueryBuilder = void 0;
const esb = require("elastic-builder");
/**
 * 使用率查詢語句建構者
 */
class UsageQueryBuilder {
    /**
     * @param _systemId 系統 ID
     * @param _plant    廠別
     * @param _start    查詢開始時間
     * @param _end      查詢結束時間
     */
    constructor(_systemId, _plant, _start, _end) {
        this._systemId = _systemId;
        this._plant = _plant;
        this._start = _start;
        this._end = _end;
    }
    /**
     * 建構查詢語句
     *
     * @method public
     * @return 回傳查詢語句
     */
    build() {
        const plant = this._plant.map(p => p.toUpperCase());
        return esb
            .requestBodySearch()
            .from(0)
            .size(0)
            .query(esb
            .boolQuery()
            .must([
            esb.matchPhraseQuery('System', this._systemId),
            esb.termsQuery('Plant.raw', plant),
            esb.rangeQuery('evt_dt').gte(this._start).lte(this._end),
        ]))
            .agg(esb
            .termsAggregation('plant', 'Plant.raw')
            .agg(esb.valueCountAggregation('count', '_index')));
    }
}
exports.UsageQueryBuilder = UsageQueryBuilder;
