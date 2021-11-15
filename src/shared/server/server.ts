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

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import { Log4js } from 'wistroni40-backend-utility';
import { UsageTemplate } from './../template';
import { TimeUtility } from './../utils';
import { SWAGGER_DOC } from './swagger';

/**
 * 使用率重拋 API 服務器
 */
export class Server {
  /**
   * 單一實例
   */
  private static _instance: Server;
  /**
   * 日誌
   */
  private readonly _logger = new Log4js('API');
  /**
   * API Server
   */
  private readonly _server = express();
  /**
   * API
   */
  private _api?: http.Server;
  /**
   * 使用率上拋服務
   */
  private _service: UsageTemplate[] = [];

  /**
   * @param _port 服務器端口
   */
  private constructor(private _port = 3010) {
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
  public static instance(service: UsageTemplate, port?: number): Server {
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
  private async sendYesterday(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    this._service.forEach(service => service.execute().subscribe());
    res.send(true);
  }

  /**
   * 重新上拋特定時間的使用率
   *
   * @method private
   * @param req 請求
   * @param res 回應
   */
  private async sendAt(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const time = new Date(parseInt(req.query.time as string, 10));
    const start = TimeUtility.RESET(time);
    const end = start + TimeUtility.DAY;
    this._service.forEach(service => service.execute(start, end).subscribe());
    res.send(true);
  }

  /**
   * 重新上拋特定時間範圍的使用率
   *
   * @method private
   * @param req 請求
   * @param res 回應
   */
  private async sendBetween(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    let start = new Date(parseInt(req.query.start as string, 10)).getTime();
    start = TimeUtility.RESET(start);
    let end = new Date(parseInt(req.query.end as string, 10)).getTime();
    end = TimeUtility.RESET(end);
    let current = start;
    while (current < end) {
      this._service.forEach(service => {
        service.execute(current, current + TimeUtility.DAY).subscribe();
      });
      current += TimeUtility.DAY;
    }
    res.send(true);
  }

  /**
   * 重新上拋昨日特定廠別的使用率
   *
   * @method private
   * @param req 請求
   * @param res 回應
   */
  private async yesterdayPlant(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const plant = req.query.plant as string;
    const start = TimeUtility.YESTEDAY;
    const end = TimeUtility.TODAY;
    this._service.forEach(svc => svc.execute(start, end, plant).subscribe());
    res.send(true);
  }

  /**
   * 重新上拋特定時間特定廠別的使用率
   *
   * @method private
   * @param req 請求
   * @param res 回應
   */
  private async sendPlantAt(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const time = new Date(parseInt(req.query.time as string, 10));
    const plant = req.query.plant as string;
    const start = TimeUtility.RESET(time);
    const end = start + TimeUtility.DAY;
    this._service.forEach(svc => svc.execute(start, end, plant).subscribe());
    res.send(true);
  }

  /**
   * 重新上拋特定時間範圍特定廠別的使用率
   *
   * @method private
   * @param req 請求
   * @param res 回應
   */
  private async sendPlantBetween(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    const plant = req.query.plant as string;
    let start = new Date(parseInt(req.query.start as string, 10)).getTime();
    start = TimeUtility.RESET(start);
    let end = new Date(parseInt(req.query.end as string, 10)).getTime();
    end = TimeUtility.RESET(end);
    let current = start;
    while (current < end) {
      this._service.forEach(svc => {
        svc.execute(current, current + TimeUtility.DAY, plant).subscribe();
      });
      current += TimeUtility.DAY;
    }
    res.send(true);
  }

  /**
   * 啟動 API Server
   *
   * @method public
   * @return 回傳物件本身
   */
  public start(): Server {
    const port = this._port;
    this._server.use(bodyParser.json());
    this._server.post('/send/yesterday', this.sendYesterday.bind(this));
    this._server.post('/send/at', this.sendAt.bind(this));
    this._server.post('/send/between', this.sendBetween.bind(this));
    this._server.post('/send/plant/yesterday', this.yesterdayPlant.bind(this));
    this._server.post('/send/plant/at', this.sendPlantAt.bind(this));
    this._server.post('/send/plant/between', this.sendPlantBetween.bind(this));
    this._server.use('/', swaggerUi.serve, swaggerUi.setup(SWAGGER_DOC));
    this._logger.info(`Listen api port ${port}`);
    this._api = this._server.listen(port);
    return this;
  }
}
