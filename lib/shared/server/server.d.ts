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
import { UsageTemplate } from './../template';
/**
 * 使用率重拋 API 服務器
 */
export declare class Server {
    private _port;
    /**
     * 單一實例
     */
    private static _instance;
    /**
     * 日誌
     */
    private readonly _logger;
    /**
     * API Server
     */
    private readonly _server;
    /**
     * API
     */
    private _api?;
    /**
     * 使用率上拋服務
     */
    private _service;
    /**
     * @param _port 服務器端口
     */
    private constructor();
    /**
     * 取得單一實例
     *
     * @method public
     * @param service 使用率上拋服務
     * @param port    API 端口
     * @return 回傳 API 服務器
     */
    static instance(service: UsageTemplate, port?: number): Server;
    /**
     * 重新上拋昨日的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    private sendYesterday;
    /**
     * 重新上拋特定時間的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    private sendAt;
    /**
     * 重新上拋特定時間範圍的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    private sendBetween;
    /**
     * 重新上拋昨日特定廠別的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    private yesterdayPlant;
    /**
     * 重新上拋特定時間特定廠別的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    private sendPlantAt;
    /**
     * 重新上拋特定時間範圍特定廠別的使用率
     *
     * @method private
     * @param req 請求
     * @param res 回應
     */
    private sendPlantBetween;
    /**
     * 啟動 API Server
     *
     * @method public
     * @return 回傳物件本身
     */
    start(): Server;
}
