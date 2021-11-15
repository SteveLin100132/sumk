"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageDurationQueryBuilder = void 0;
const esb = require("elastic-builder");
const wistroni40_dynamic_class_1 = require("wistroni40-dynamic-class");
/**
 * 使用持續時間查詢語句建構者
 */
let UsageDurationQueryBuilder = class UsageDurationQueryBuilder {
    /**
     * @param _condition 查詢條件
     */
    constructor(_condition) {
        this._condition = _condition;
    }
    /**
     * 建構查詢語句
     *
     * @method public
     * @return 回傳查詢語句
     */
    build() {
        return esb
            .requestBodySearch()
            .from(0)
            .size(0)
            .query(esb
            .boolQuery()
            .must([
            esb.matchQuery('System.raw', this._condition.systemid),
            esb.matchQuery('Plant.raw', this._condition.plant),
            esb
                .rangeQuery('evt_dt')
                .gte(this._condition.start)
                .lte(this._condition.end),
        ]))
            .agg(esb
            .termsAggregation('plant', 'Plant.raw')
            .agg(esb.sumAggregation('count', 'Stay')));
    }
};
UsageDurationQueryBuilder = __decorate([
    (0, wistroni40_dynamic_class_1.DynamicClass)(),
    __metadata("design:paramtypes", [Object])
], UsageDurationQueryBuilder);
exports.UsageDurationQueryBuilder = UsageDurationQueryBuilder;
