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

import { Observable } from 'rxjs';
import { ConsumerAdapter } from 'wistroni40-backend-utility';
import { UsagePayload } from './../models';

/**
 * 使用率初始資料消費者轉接器
 */
export class UsageConsumerAdapter extends ConsumerAdapter<null, UsagePayload> {
  /**
   * @param _payloads 使用率初始資料
   */
  constructor(private _payloads: UsagePayload[]) {
    super(null);
  }

  /**
   * 消費資料
   *
   * @method public
   * @return 取得要消費的資料
   */
  public consume(): Observable<UsagePayload> {
    return new Observable(sub => {
      this._payloads.forEach((payload, index) => {
        sub.next(payload);
        if (index === this._payloads.length - 1) {
          sub.complete();
        }
      });
    });
  }
}
