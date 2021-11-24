/**
 * Reqeust Base
 *
 * @export
 * @interface RequestBase
 */
export interface RequestBase {
    /** 每頁筆數 */
    perPage?: number;
    /** 頁碼 */
    page?: number;
    /** 取最前筆數 */
    $top?: number;
    /** 跳過筆數 */
    $skip?: number;
    /** 排序 */
    $orderby?: string;
    /** 過濾 (回傳符合特定表達式的資料) */
    $filter?: string;
}