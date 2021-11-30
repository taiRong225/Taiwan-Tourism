/**
 * 輪播圖
 *
 * @export
 * @interface Carousel
 */
export interface Carousel {
    /** 代碼 */
    ID?: string;
    /** 標題 */
    title?: string;
    /** 副標題 */
    subTitle?: string;

    /** 圖片路徑 */
    path?: string;
    /** 圖片說明 */
    alt?: string;
    /** 觀光類型 */
    tourismType?: TourismType;
}