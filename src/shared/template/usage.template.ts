/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率範本
 * @CREATE Monday, 8th November 2021 1:23:27 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as schedule from 'node-schedule';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import {
  Consumer,
  ElasticBuilder,
  HttpProducerAdapter,
  Log4js,
  LoggerAdapter,
  Producer,
  RetryProducerAdapter,
} from 'wistroni40-backend-utility';
import { DynamicClassFactory as Factory } from 'wistroni40-dynamic-class';
import { UsageConsumerAdapter } from '../consumer';
import {
  UsageConfig,
  UsageCount,
  UsagePayload,
  UsagePayloadEntity,
  UsageResponse,
} from '../models';
import { Server } from '../server';
import { TimeUtility } from '../utils';
import { CoreTemplate } from './../../core';
import { UsageQueryExecutor } from './../executor';
import { QueryConditionBuilder } from './classes';
import { CustomUsage } from './custom-usage.template';
import { UsageType } from './models';

/**
 * 使用率範本
 */
export abstract class UsageTemplate
  implements CoreTemplate<UsagePayload>, CustomUsage
{
  /**
   * API 服務器
   */
  private _server: Server;
  /**
   * 時間公用工具
   */
  private _timeUtil = new TimeUtility();
  /**
   * 使用率保存清單
   */
  private _usage = new Map<string, number>();
  /**
   * 上拋資料訂閱主題
   */
  private _payload = new Subject<UsageResponse>();
  /**
   * 排程設定
   */
  private _cron?: string;
  /**
   * 日誌
   */
  protected logger: LoggerAdapter = new Log4js('USAGE');
  /**
   * 使用率類型
   */
  public type: UsageType = 'Count';

  /**
   * @param config 服務設定檔
   */
  constructor(protected config: UsageConfig) {
    this._server = Server.instance(this, config.port);
  }

  /**
   * 取得資料消費者
   *
   * @method private
   * @param start 查詢開始時間
   * @param plant 要查詢的廠別
   * @return 回傳資料消費者
   */
  private async consumer(
    start: number,
    plant?: string,
  ): Promise<Consumer<UsagePayload>> {
    const plantList = plant ? [plant] : this.config.plant;
    const usage = plantList.map(p => {
      return new UsagePayloadEntity({
        plant: p,
        systemid: this.config.systemId,
        cmpunitdesc: this.config.unit,
        uploadtime: start,
      });
    });
    return new UsageConsumerAdapter(usage);
  }

  /**
   * 取得資料生產者
   *
   * @method private
   * @return 回傳資料生產者
   */
  private async producer(): Promise<Producer<UsagePayload>> {
    return new HttpProducerAdapter(this.config.publishedApi);
  }

  /**
   * 更新當日使用率
   *
   * @method public
   * @param payload 使用率數據
   * @param start 觸發開始時間
   * @param ernd  觸發結束時間
   * @return 回傳使用率數據
   */
  public async update(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsageCount> {
    const executor = new UsageQueryExecutor(this.config);
    const condition = new QueryConditionBuilder()
      .setUsage(payload)
      .setBetween(start, end)
      .build();
    const strategy = `Usage${this.type}QueryBuilder`;
    const query = Factory.createInstance<ElasticBuilder>(strategy, condition);
    const result = await executor.exec(query);
    return result.length > 0 ? result[0] : { plant: '', count: 0 };
  }

  /**
   * 客製查詢當日使用率
   *
   * @method public
   * @param payload 使用率數據
   * @param start 觸發開始時間
   * @param ernd  觸發結束時間
   * @return 回傳使用率數據
   */
  public async query(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsageCount> {
    return { plant: '', count: 0 };
  }

  /**
   * 路由至內建或客製的使用率查詢方式
   *
   * @method public
   * @param payload 使用率數據
   * @param start   觸發開始時間
   * @param ernd    觸發結束時間
   * @return 回傳使用率數據
   */
  public async route(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsagePayload> {
    const usage =
      this.type === 'Custom'
        ? await this.query(payload, start, end)
        : await this.update(payload, start, end);
    this._usage.set(payload.plant, usage.count);
    return payload;
  }

  /**
   * 設定實際使用量
   *
   * @method public
   * @param payload 使用率數據
   * @return 回傳添加實際使用量的使用率數據
   */
  public setActualUsage(payload: UsagePayload): UsagePayload {
    payload.actual = this._usage.get(payload.plant) ?? 0;
    return payload;
  }

  /**
   * 取得標準值
   *
   * @method public
   * @param payload 使用率數據
   * @param start   查詢開始時間
   * @param end     查詢結束時間
   * @return 回傳標準值
   */
  public abstract target(
    payload: UsagePayload,
    start: number,
    end: number,
  ): Promise<UsagePayload>;

  /**
   * 驗證使用率是否達標
   *
   * @method public
   * @param payload 使用率數據
   * @return 使用率數據
   */
  public achieve(payload: UsagePayload): UsagePayload {
    payload.status = payload.actual >= payload.target ? 1 : 0;
    return payload;
  }

  /**
   * 上拋資料
   *
   * @method public
   * @param payload 使用率數據
   */
  public async publish(payload: UsagePayload): Promise<void> {
    const producer = await this.producer();
    const retry = new RetryProducerAdapter(producer);
    retry.publish(payload, error => {
      this._payload.next({ error, result: payload });
    });
  }

  /**
   * 消費資料
   *
   * @method public
   * @param start 觸發開始時間
   * @param ernd  觸發結束時間
   * @param plant 要查詢的廠別
   */
  public async consume(
    start: number,
    end: number,
    plant?: string,
  ): Promise<void> {
    const consumer = await this.consumer(start, plant);
    const consume$ = consumer.consume().pipe(
      // 更新最新的使用率
      mergeMap(usage => this.route(usage, start, end)),
      // 添加實際使用量
      map(usage => this.setActualUsage(usage)),
      // 取得標準值
      mergeMap(usage => this.target(usage, start, end)),
      // 驗證使用率是否達標
      map(usage => this.achieve(usage)),
      // 發送數據
      tap(usage => this.publish(usage)),
    );
    consume$.subscribe();
  }

  /**
   * 執行流程
   *
   * @method public
   * @param start 觸發開始時間
   * @param ernd  觸發結束時間
   * @param plant 要查詢的廠別
   * @return 回傳流程執行結果
   */
  public execute(
    start?: number,
    end?: number,
    plant?: string,
  ): Observable<UsageResponse> {
    this.logger.trace('Start usage service');
    start = start || this._timeUtil.getYesterday();
    end = end || this._timeUtil.getToday();
    this.consume(start, end, plant);
    return this._payload.asObservable();
  }

  /**
   * 設定排程執行使用率查詢
   *
   * @method public
   * @param cron 排程
   * @return 回傳流程執行結果
   */
  public setSchedule(cron: string): Observable<UsageResponse> {
    this._cron = cron;
    schedule.scheduleJob(this._cron, () => this.execute());
    return this._payload.asObservable();
  }
}
