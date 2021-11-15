"use strict";
/**
 * 專案名稱： wistroni40-sumk
 * 部門代號： MLD500
 * 檔案說明： 使用率初始資料消費者轉接器
 * @CREATE Friday, 5th November 2021 5:45:25 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageConsumerAdapter = void 0;
const rxjs_1 = require("rxjs");
const wistroni40_backend_utility_1 = require("wistroni40-backend-utility");
/**
 * 使用率初始資料消費者轉接器
 */
class UsageConsumerAdapter extends wistroni40_backend_utility_1.ConsumerAdapter {
    /**
     * @param _payloads 使用率初始資料
     */
    constructor(_payloads) {
        super(null);
        this._payloads = _payloads;
    }
    /**
     * 消費資料
     *
     * @method public
     * @return 取得要消費的資料
     */
    consume() {
        return new rxjs_1.Observable(sub => {
            this._payloads.forEach((payload, index) => {
                sub.next(payload);
                if (index === this._payloads.length - 1) {
                    sub.complete();
                }
            });
        });
    }
}
exports.UsageConsumerAdapter = UsageConsumerAdapter;
