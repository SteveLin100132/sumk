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
export class TimeUtility {
  /**
   * 一日毫秒數
   */
  public static DAY = 1000 * 60 * 60 * 24;

  /**
   * 將時間重設為午夜整點
   *
   * @method public
   * @param time 要重設的時間
   * @return 回傳重設回午夜整點的時間
   */
  public static RESET(time: number | Date): number {
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
  public static get YESTEDAY(): number {
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
  public static get TODAY(): number {
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
  public reset(time: number | Date): number {
    return TimeUtility.RESET(time);
  }

  /**
   * 取得昨日時間
   *
   * @method public
   * @return 回傳昨日時間
   */
  public getYesterday(): number {
    return TimeUtility.YESTEDAY;
  }

  /**
   * 取得今日時間
   *
   * @method public
   * @return 回傳今日時間
   */
  public getToday(): number {
    return TimeUtility.TODAY;
  }
}
