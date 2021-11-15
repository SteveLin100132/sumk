/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用次數查詢執行器
 * @CREATE Monday, 8th November 2021 1:42:13 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Executor } from '../../core';
import { UsageConfig, UsageCount } from './../models';
import { QueryCondition } from './models';
/**
 * 使用次數查詢執行器
 */
export declare class UsageCountExecutor implements Executor<QueryCondition, UsageCount[]> {
    private _config;
    /**
     * @param _config 使用率服務設定檔
     */
    constructor(_config: UsageConfig);
    /**
     * 執行查詢
     *
     * @method public
     * @param conditon 查詢條件
     * @return 回傳查詢結果
     */
    exec(conditon: QueryCondition): Promise<UsageCount[]>;
}
