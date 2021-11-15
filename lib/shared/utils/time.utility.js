"use strict";
/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 時間公用工具
 * @CREATE Monday, 8th November 2021 1:25:58 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUtility = void 0;
/**
 * 時間公用工具
 */
class TimeUtility {
    /**
     * 將時間重設為午夜整點
     *
     * @method public
     * @param time 要重設的時間
     * @return 回傳重設回午夜整點的時間
     */
    static RESET(time) {
        const date = new Date(time);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    }
    /**
     * 取得昨日時間
     *
     * @method public
     * @return 回傳昨日時間
     */
    static get YESTEDAY() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return TimeUtility.RESET(date);
    }
    /**
     * 取得今日時間
     *
     * @method public
     * @return 回傳今日時間
     */
    static get TODAY() {
        const date = new Date();
        return TimeUtility.RESET(date);
    }
    /**
     * 將時間重設為午夜整點
     *
     * @method public
     * @param time 要重設的時間
     * @return 回傳重設回午夜整點的時間
     */
    reset(time) {
        return TimeUtility.RESET(time);
    }
    /**
     * 取得昨日時間
     *
     * @method public
     * @return 回傳昨日時間
     */
    getYesterday() {
        return TimeUtility.YESTEDAY;
    }
    /**
     * 取得今日時間
     *
     * @method public
     * @return 回傳今日時間
     */
    getToday() {
        return TimeUtility.TODAY;
    }
}
exports.TimeUtility = TimeUtility;
/**
 * 一日毫秒數
 */
TimeUtility.DAY = 1000 * 60 * 60 * 24;
