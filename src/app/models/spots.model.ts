import { Picture, PointType, TourismPicture } from "./common.model";

/**
 * 觀光景點
 *
 * @export
 * @interface Spots
 */
export interface Spots {
    /** 景點代碼 */
    ID?: string;
    /** 景點名稱 */
    Name?: string;
    /** 景點特色詳細說明 */
    DescriptionDetail?: string;
    /** 景點服務電話 */
    Phone?: string;
    /** 景點地址 */
    Address?: string;
    /** 交通資訊 */
    TravelInfo?: string;
    /** 開放時間 */
    OpenTime?: string;
    /** 圖片資料 */
    Picture?: TourismPicture;
    /** 圖片陣列資料 */
    Pictures?: Picture[];
    /** 經緯度 */
    Position?: PointType;
    /** 景點分類1 */
    Class1?: string;
    /** 景點分類2 */
    Class2?: string;
    /** 景點分類3 */
    Class3?: string;
    /** 景點分類陣列資料 */
    Classes?: string[];
    /** 古蹟等級 */
    Level?: string;
    /** 景點官方網站網址 */
    WebsiteUrl?: string;
    /** 票價資訊 */
    TicketInfo?: string;
    /** 警告與注意事項 */
    Remarks?: string;
    /**  所屬縣市 */
    City?: string;
    /** 本平台資料更新時間 */
    UpdateTime?: string;
}

/**
 * 觀光景點主題
 *
 * @export
 * @interface SpotsTopic
 */
export interface SpotsTopic {
    /** 主題名稱 */
    name?: string;
    /** 圖片路徑 */
    path?: string;
    /** 圖片說明 */
    alt?: string;
}