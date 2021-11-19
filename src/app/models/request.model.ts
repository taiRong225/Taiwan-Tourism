/**
 * Reqeust Base
 *
 * @export
 * @interface RequestBase
 */
export interface RequestBase {
    /** 取最前筆數 */
    $top?: number;
    /** 跳過筆數 */
    $skip?: number
}