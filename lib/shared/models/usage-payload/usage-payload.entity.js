"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsagePayloadEntity = void 0;
const dayjs = require("dayjs");
const utils_1 = require("./../../utils");
/**
 * 使用率上拋資料實體
 */
class UsagePayloadEntity {
    /**
     * @param payload 使用率上拋資料
     */
    constructor(payload) {
        /**
         * 時間戳
         */
        this.datadate = dayjs(utils_1.TimeUtility.YESTEDAY).format('YYYY-MM-DD');
        /**
         * 系統 ID
         */
        this.systemid = '';
        /**
         * 廠別
         */
        this.plant = '';
        /**
         * 實際使用次數
         */
        this.actual = 0;
        /**
         * 目標使用次數
         */
        this.target = 0;
        /**
         * 是否達標，0: 未達標；1: 達標
         */
        this.status = 0;
        /**
         * 單位說明
         */
        this.cmpunitdesc = '';
        /**
         * 時間戳(Epochtime)
         */
        this.uploadtime = utils_1.TimeUtility.YESTEDAY;
        Object.assign(this, payload);
        const timestamp = (payload === null || payload === void 0 ? void 0 : payload.uploadtime) || utils_1.TimeUtility.YESTEDAY;
        this.datadate = dayjs(timestamp).format('YYYY-MM-DD');
    }
}
exports.UsagePayloadEntity = UsagePayloadEntity;
