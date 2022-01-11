import { Picture, PointType, TourismPicture, TourismTopic } from "./common.model";

/**
 * 觀光餐飲
 *
 * @export
 * @interface Restaurant
 */
export interface Restaurant {
    /** 餐飲店家代碼 */
    RestaurantID?: string;
    /** 餐飲店家名稱 */
    RestaurantName?: string;
    /** 店家簡述 */
    Description?: string;
    /** 店家地址 */
    Address?: string;
    /** 預約電話 */
    Phone?: string;
    /** 營業時間 */
    OpenTime?: string;
    /** 店家網站網址 */
    WebsiteUrl?: string;
    /** 圖片資料 */
    Picture?: TourismPicture;
    /** 圖片陣列資料 */
    Pictures?: Picture[];
    /** 經緯度 */
    Position?: PointType;
    /** 店家分類 */
    Class?: string;
    /** 停車資訊 */
    ParkingInfo?: string;
    /** 所屬縣市 */
    City?: string;
    /** 本平台資料更新時間 */
    UpdateTime?: string;
}

/**
 * 觀光餐飲主題
 *
 * @export
 * @interface RestaurantTopic
 * @extends {TourismTopic}
 */
export interface RestaurantTopic extends TourismTopic { }