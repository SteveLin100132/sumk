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
/**
 * 時間公用工具
 */
export declare class TimeUtility {
    /**
     * 一日毫秒數
     */
    static DAY: number;
    /**
     * 將時間重設為午夜整點
     *
     * @method public
     * @param time 要重設的時間
     * @return 回傳重設回午夜整點的時間
     */
    static RESET(time: number | Date): number;
    /**
     * 取得昨日時間
     *
     * @method public
     * @return 回傳昨日時間
     */
    static get YESTEDAY(): number;
    /**
     * 取得今日時間
     *
     * @method public
     * @return 回傳今日時間
     */
    static get TODAY(): number;
    /**
     * 將時間重設為午夜整點
     *
     * @method public
     * @param time 要重設的時間
     * @return 回傳重設回午夜整點的時間
     */
    reset(time: number | Date): number;
    /**
     * 取得昨日時間
     *
     * @method public
     * @return 回傳昨日時間
     */
    getYesterday(): number;
    /**
     * 取得今日時間
     *
     * @method public
     * @return 回傳今日時間
     */
    getToday(): number;
}
