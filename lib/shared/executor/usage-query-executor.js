"use strict";
/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率查詢執行器
 * @CREATE Monday, 8th November 2021 1:42:13 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageQueryExecutor = void 0;
const elasticsearch_1 = require("elasticsearch");
const wistroni40_backend_utility_1 = require("wistroni40-backend-utility");
/**
 * 使用率查詢執行器
 */
class UsageQueryExecutor {
    /**
     * @param _config 使用率服務設定檔
     */
    constructor(_config) {
        this._config = _config;
    }
    /**
     * 執行查詢
     *
     * @method public
     * @param builder ElasticSearch 查詢語句建構者
     * @return 回傳查詢結果
     */
    exec(builder) {
        const hosts = (this._config.hosts || '').split(',');
        const client = new elasticsearch_1.Client({ hosts });
        const index = this._config.index || '';
        const type = this._config.type;
        const executor = new wistroni40_backend_utility_1.ElasticsearchSearchExecutor(client, index, type, builder, 'aggs');
        return executor.exec();
    }
}
exports.UsageQueryExecutor = UsageQueryExecutor;
