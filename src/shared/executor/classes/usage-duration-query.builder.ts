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

import * as esb from 'elastic-builder';
import { ElasticBuilder } from 'wistroni40-backend-utility';
import { DynamicClass } from 'wistroni40-dynamic-class';
import { QueryCondition } from './../models';

/**
 * 使用持續時間查詢語句建構者
 */
@DynamicClass()
export class UsageDurationQueryBuilder implements ElasticBuilder {
  /**
   * @param _condition 查詢條件
   */
  constructor(private _condition: QueryCondition) {}

  /**
   * 建構查詢語句
   *
   * @method public
   * @return 回傳查詢語句
   */
  public build(): esb.RequestBodySearch {
    return esb
      .requestBodySearch()
      .from(0)
      .size(0)
      .query(
        esb
          .boolQuery()
          .must([
            esb.matchQuery('System.raw', this._condition.systemid),
            esb.matchQuery('Plant.raw', this._condition.plant),
            esb
              .rangeQuery('evt_dt')
              .gte(this._condition.start)
              .lte(this._condition.end),
          ]),
      )
      .agg(
        esb
          .termsAggregation('plant', 'Plant.raw')
          .agg(esb.sumAggregation('count', 'Stay')),
      );
  }
}
