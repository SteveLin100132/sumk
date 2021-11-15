"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageTemplate = void 0;
const schedule = require("node-schedule");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const wistroni40_backend_utility_1 = require("wistroni40-backend-utility");
const wistroni40_dynamic_class_1 = require("wistroni40-dynamic-class");
const consumer_1 = require("../consumer");
const models_1 = require("../models");
const server_1 = require("../server");
const utils_1 = require("../utils");
const executor_1 = require("./../executor");
const classes_1 = require("./classes");
/**
 * 使用率範本
 */
class UsageTemplate {
    /**
     * @param config 服務設定檔
     */
    constructor(config) {
        this.config = config;
        /**
         * 時間公用工具
         */
        this._timeUtil = new utils_1.TimeUtility();
        /**
         * 使用率保存清單
         */
        this._usage = new Map();
        /**
         * 上拋資料訂閱主題
         */
        this._payload = new rxjs_1.Subject();
        /**
         * 日誌
         */
        this.logger = new wistroni40_backend_utility_1.Log4js('USAGE');
        /**
         * 使用率類型
         */
        this.type = 'Count';
        this._server = server_1.Server.instance(this, config.port);
    }
    /**
     * 取得資料消費者
     *
     * @method private
     * @param start 查詢開始時間
     * @param plant 要查詢的廠別
     * @return 回傳資料消費者
     */
    consumer(start, plant) {
        return __awaiter(this, void 0, void 0, function* () {
            const plantList = plant ? [plant] : this.config.plant;
            const usage = plantList.map(p => {
                return new models_1.UsagePayloadEntity({
                    plant: p,
                    systemid: this.config.systemId,
                    cmpunitdesc: this.config.unit,
                    uploadtime: start,
                });
            });
            return new consumer_1.UsageConsumerAdapter(usage);
        });
    }
    /**
     * 取得資料生產者
     *
     * @method private
     * @return 回傳資料生產者
     */
    producer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new wistroni40_backend_utility_1.HttpProducerAdapter(this.config.publishedApi);
        });
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
    update(payload, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const executor = new executor_1.UsageQueryExecutor(this.config);
            const condition = new classes_1.QueryConditionBuilder()
                .setUsage(payload)
                .setBetween(start, end)
                .build();
            const strategy = `Usage${this.type}QueryBuilder`;
            const query = wistroni40_dynamic_class_1.DynamicClassFactory.createInstance(strategy, condition);
            const result = yield executor.exec(query);
            return result.length > 0 ? result[0] : { plant: '', count: 0 };
        });
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
    query(payload, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            return { plant: '', count: 0 };
        });
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
    route(payload, start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const usage = this.type === 'Custom'
                ? yield this.query(payload, start, end)
                : yield this.update(payload, start, end);
            this._usage.set(payload.plant, usage.count);
            return payload;
        });
    }
    /**
     * 設定實際使用量
     *
     * @method public
     * @param payload 使用率數據
     * @return 回傳添加實際使用量的使用率數據
     */
    setActualUsage(payload) {
        var _a;
        payload.actual = (_a = this._usage.get(payload.plant)) !== null && _a !== void 0 ? _a : 0;
        return payload;
    }
    /**
     * 驗證使用率是否達標
     *
     * @method public
     * @param payload 使用率數據
     * @return 使用率數據
     */
    achieve(payload) {
        payload.status = payload.actual >= payload.target ? 1 : 0;
        return payload;
    }
    /**
     * 上拋資料
     *
     * @method public
     * @param payload 使用率數據
     */
    publish(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const producer = yield this.producer();
            const retry = new wistroni40_backend_utility_1.RetryProducerAdapter(producer);
            retry.publish(payload, error => {
                this._payload.next({ error, result: payload });
            });
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
    consume(start, end, plant) {
        return __awaiter(this, void 0, void 0, function* () {
            const consumer = yield this.consumer(start, plant);
            const consume$ = consumer.consume().pipe(
            // 更新最新的使用率
            (0, operators_1.mergeMap)(usage => this.route(usage, start, end)), 
            // 添加實際使用量
            (0, operators_1.map)(usage => this.setActualUsage(usage)), 
            // 取得標準值
            (0, operators_1.mergeMap)(usage => this.target(usage, start, end)), 
            // 驗證使用率是否達標
            (0, operators_1.map)(usage => this.achieve(usage)), 
            // 發送數據
            (0, operators_1.tap)(usage => this.publish(usage)));
            consume$.subscribe();
        });
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
    execute(start, end, plant) {
        this.logger.trace('Start usage service');
        start = start || this._timeUtil.getYesterday();
        end = end || this._timeUtil.getToday();
        this.consume(start, end, plant);
        return this._payload;
    }
    /**
     * 設定排程執行使用率查詢
     *
     * @method public
     * @param cron 排程
     * @return 回傳流程執行結果
     */
    setSchedule(cron) {
        this._cron = cron;
        schedule.scheduleJob(this._cron, () => this.execute());
        return this._payload;
    }
}
exports.UsageTemplate = UsageTemplate;
