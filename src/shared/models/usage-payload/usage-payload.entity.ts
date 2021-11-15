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

import * as dayjs from 'dayjs';
import { TimeUtility } from './../../utils';
import { UsagePayload } from './usage-payload.model';

/**
 * 使用率上拋資料實體
 */
export class UsagePayloadEntity implements UsagePayload {
  /**
   * 時間戳
   */
  public datadate = dayjs(TimeUtility.YESTEDAY).format('YYYY-MM-DD');
  /**
   * 系統 ID
   */
  public systemid = '';
  /**
   * 廠別
   */
  public plant = '';
  /**
   * 實際使用次數
   */
  public actual = 0;
  /**
   * 目標使用次數
   */
  public target = 0;
  /**
   * 是否達標，0: 未達標；1: 達標
   */
  public status = 0;
  /**
   * 單位說明
   */
  public cmpunitdesc = '';
  /**
   * 時間戳(Epochtime)
   */
  public uploadtime = TimeUtility.YESTEDAY;

  /**
   * @param payload 使用率上拋資料
   */
  constructor(payload?: Partial<UsagePayload>) {
    Object.assign(this, payload);
    const timestamp = payload?.uploadtime || TimeUtility.YESTEDAY;
    this.datadate = dayjs(timestamp).format('YYYY-MM-DD');
  }
}
