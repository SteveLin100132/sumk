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
import { UsagePayload, UsagePayloadEntity } from './../../models';

/**
 * 使用率查詢條件建構者
 */
export class QueryConditionBuilder implements DataBuilder<QueryCondition> {
  /**
   * 使用率上拋資料
   */
  private _usage: UsagePayload = new UsagePayloadEntity();
  /**
   * 查詢開始時間
   */
  private _start = new Date().getTime();
  /**
   * 查詢結束時間
   */
  private _end = new Date().getTime();

  /**
   * 設定使用率上拋資料
   *
   * @method public
   * @param usage 使用率上拋資料
   * @return 回傳物件本身
   */
  public setUsage(usage: UsagePayload): this {
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
  public setBetween(start: number, end: number): this {
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
  public build(): QueryCondition {
    return {
      systemid: this._usage.systemid,
      plant: this._usage.plant,
      start: this._start,
      end: this._end,
    };
  }
}
