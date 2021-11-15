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
import { Observable } from 'rxjs';
import { LoggerAdapter } from 'wistroni40-backend-utility';
import { UsageConfig, UsageCount, UsagePayload, UsageResponse } from '../models';
import { CoreTemplate } from './../../core';
import { CustomUsage } from './custom-usage.template';
import { UsageType } from './models';
/**
 * 使用率範本
 */
export declare abstract class UsageTemplate implements CoreTemplate<UsagePayload>, CustomUsage {
    protected config: UsageConfig;
    /**
     * API 服務器
     */
    private _server;
    /**
     * 時間公用工具
     */
    private _timeUtil;
    /**
     * 使用率保存清單
     */
    private _usage;
    /**
     * 上拋資料訂閱主題
     */
    private _payload;
    /**
     * 排程設定
     */
    private _cron?;
    /**
     * 日誌
     */
    protected logger: LoggerAdapter;
    /**
     * 使用率類型
     */
    type: UsageType;
    /**
     * @param config 服務設定檔
     */
    constructor(config: UsageConfig);
    /**
     * 取得資料消費者
     *
     * @method private
     * @param start 查詢開始時間
     * @param plant 要查詢的廠別
     * @return 回傳資料消費者
     */
    private consumer;
    /**
     * 取得資料生產者
     *
     * @method private
     * @return 回傳資料生產者
     */
    private producer;
    /**
     * 更新當日使用率
     *
     * @method public
     * @param payload 使用率數據
     * @param start 觸發開始時間
     * @param ernd  觸發結束時間
     * @return 回傳使用率數據
     */
    update(payload: UsagePayload, start: number, end: number): Promise<UsageCount>;
    /**
     * 客製查詢當日使用率
     *
     * @method public
     * @param payload 使用率數據
     * @param start 觸發開始時間
     * @param ernd  觸發結束時間
     * @return 回傳使用率數據
     */
    query(payload: UsagePayload, start: number, end: number): Promise<UsageCount>;
    /**
     * 路由至內建或客製的使用率查詢方式
     *
     * @method public
     * @param payload 使用率數據
     * @param start   觸發開始時間
     * @param ernd    觸發結束時間
     * @return 回傳使用率數據
     */
    route(payload: UsagePayload, start: number, end: number): Promise<UsagePayload>;
    /**
     * 設定實際使用量
     *
     * @method public
     * @param payload 使用率數據
     * @return 回傳添加實際使用量的使用率數據
     */
    setActualUsage(payload: UsagePayload): UsagePayload;
    /**
     * 取得標準值
     *
     * @method public
     * @param payload 使用率數據
     * @param start   查詢開始時間
     * @param end     查詢結束時間
     * @return 回傳標準值
     */
    abstract target(payload: UsagePayload, start: number, end: number): Promise<UsagePayload>;
    /**
     * 驗證使用率是否達標
     *
     * @method public
     * @param payload 使用率數據
     * @return 使用率數據
     */
    achieve(payload: UsagePayload): UsagePayload;
    /**
     * 上拋資料
     *
     * @method public
     * @param payload 使用率數據
     */
    publish(payload: UsagePayload): Promise<void>;
    /**
     * 消費資料
     *
     * @method public
     * @param start 觸發開始時間
     * @param ernd  觸發結束時間
     * @param plant 要查詢的廠別
     */
    consume(start: number, end: number, plant?: string): Promise<void>;
    /**
     * 執行流程
     *
     * @method public
     * @param start 觸發開始時間
     * @param ernd  觸發結束時間
     * @param plant 要查詢的廠別
     * @return 回傳流程執行結果
     */
    execute(start?: number, end?: number, plant?: string): Observable<UsageResponse>;
    /**
     * 設定排程執行使用率查詢
     *
     * @method public
     * @param cron 排程
     * @return 回傳流程執行結果
     */
    setSchedule(cron: string): Observable<UsageResponse>;
}
