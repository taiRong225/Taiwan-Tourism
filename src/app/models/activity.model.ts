import { Picture, PointType, TourismPicture, TourismTopic } from "./common.model";

/**
 * 觀光活動
 *
 * @export
 * @interface Activity
 */
export interface Activity {
    /** 活動訊息代碼 */
    ActivityID?: string;
    /** 活動名稱 */
    ActivityName?: string;
    /** 活動簡述 */
    Description?: string;
    /** 活動參與對象 */
    Particpation?: string;
    /** 主要活動地點名稱 */
    Location?: string;
    /** 主要活動地點地址 */
    Address?: string;
    /** 活動聯絡電話 */
    Phone?: string;
    /** 活動主辦單位 */
    Organizer?: string;
    /** 活動開始時間 */
    StartTime?: string;
    /** 活動結束時間 */
    EndTime?: string;
    /** 活動網址 */
    WebsiteUrl?: string;
    /** 圖片資料 */
    Picture?: TourismPicture;
    /** 圖片陣列資料 */
    Pictures?: Picture[];
    /** 經緯度 */
    Position?: PointType;
    /** 活動分類1 */
    Class1?: string;
    /** 活動分類2 */
    Class2?: string;
    /** 活動分類陣列資料 */
    Classes?: string[];
    /** 交通資訊 */
    TravelInfo?: string;
    /** 費用標示 */
    charge?: string;
    /** 備註(其他活動相關事項) */
    Remarks?: string;
    /** 所屬縣市 */
    City?: string;
    /** 本平台資料更新時間 */
    UpdateTime?: string;
}

/**
 * 觀光活動主題
 *
 * @export
 * @interface ActivityTopic
 * @extends {TourismTopic}
 */
export interface ActivityTopic extends TourismTopic { }