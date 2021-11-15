"use strict";
/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率重拋 API 服務器
 * @CREATE Monday, 8th November 2021 6:30:55 pm
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
exports.Server = void 0;
const bodyParser = require("body-parser");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const wistroni40_backend_utility_1 = require("wistroni40-backend-utility");
const utils_1 = require("./../utils");
const swagger_1 = require("./swagger");
/**
 * 使用率重拋 API 服務器
 */
class Server {
    /**
     * @param _port 服務器端口
     */
    constructor(_port = 3010) {
        this._port = _port;
        /**
         * 日誌
         */
        this._logger = new wistroni40_backend_utility_1.Log4js('API');
        /**
         * API Server
         */
        this._server = express();
        /**
         * 使用率上拋服務
         */
        this._service = [];
        // 啟動API Server
        this.start();
    }
    /**
     * 取得單一實例
     *
     * @method public
     * @param service 使用率上拋服務
     * @param port    API 端口
     * @return 回傳 API 服務器
     */
    static instance(service, port) {
        if (Server._instance === undefined) {
            Server._instance = new Server(port);
        }
        Server._instance._service.push(service);
        return Server._instance;
    }
    /**
     * 重新上拋昨日的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    sendYesterday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this._service.forEach(service => service.execute().subscribe());
            res.send(true);
        });
    }
    /**
     * 重新上拋特定時間的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    sendAt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = new Date(parseInt(req.query.time, 10));
            const start = utils_1.TimeUtility.RESET(time);
            const end = start + utils_1.TimeUtility.DAY;
            this._service.forEach(service => service.execute(start, end).subscribe());
            res.send(true);
        });
    }
    /**
     * 重新上拋特定時間範圍的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    sendBetween(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = new Date(parseInt(req.query.start, 10)).getTime();
            start = utils_1.TimeUtility.RESET(start);
            let end = new Date(parseInt(req.query.end, 10)).getTime();
            end = utils_1.TimeUtility.RESET(end);
            let current = start;
            while (current < end) {
                this._service.forEach(service => {
                    service.execute(current, current + utils_1.TimeUtility.DAY).subscribe();
                });
                current += utils_1.TimeUtility.DAY;
            }
            res.send(true);
        });
    }
    /**
     * 重新上拋昨日特定廠別的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    yesterdayPlant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const plant = req.query.plant;
            const start = utils_1.TimeUtility.YESTEDAY;
            const end = utils_1.TimeUtility.TODAY;
            this._service.forEach(svc => svc.execute(start, end, plant).subscribe());
            res.send(true);
        });
    }
    /**
     * 重新上拋特定時間特定廠別的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    sendPlantAt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = new Date(parseInt(req.query.time, 10));
            const plant = req.query.plant;
            const start = utils_1.TimeUtility.RESET(time);
            const end = start + utils_1.TimeUtility.DAY;
            this._service.forEach(svc => svc.execute(start, end, plant).subscribe());
            res.send(true);
        });
    }
    /**
     * 重新上拋特定時間範圍特定廠別的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    sendPlantBetween(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const plant = req.query.plant;
            let start = new Date(parseInt(req.query.start, 10)).getTime();
            start = utils_1.TimeUtility.RESET(start);
            let end = new Date(parseInt(req.query.end, 10)).getTime();
            end = utils_1.TimeUtility.RESET(end);
            let current = start;
            while (current < end) {
                this._service.forEach(svc => {
                    svc.execute(current, current + utils_1.TimeUtility.DAY, plant).subscribe();
                });
                current += utils_1.TimeUtility.DAY;
            }
            res.send(true);
        });
    }
    /**
     * 啟動 API Server
     *
     * @method public
     * @return 回傳物件本身
     */
    start() {
        const port = this._port;
        this._server.use(bodyParser.json());
        this._server.post('/send/yesterday', this.sendYesterday.bind(this));
        this._server.post('/send/at', this.sendAt.bind(this));
        this._server.post('/send/between', this.sendBetween.bind(this));
        this._server.post('/send/plant/yesterday', this.yesterdayPlant.bind(this));
        this._server.post('/send/plant/at', this.sendPlantAt.bind(this));
        this._server.post('/send/plant/between', this.sendPlantBetween.bind(this));
        this._server.use('/', swaggerUi.serve, swaggerUi.setup(swagger_1.SWAGGER_DOC));
        this._logger.info(`Listen api port ${port}`);
        this._api = this._server.listen(port);
        return this;
    }
}
exports.Server = Server;
