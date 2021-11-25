/**
 * 圖片資料
 *
 * @interface TourismPicture
 */
export interface TourismPicture {
    /** 照片連結網址1 */
    PictureUrl1?: string;
    /** 照片說明1 */
    PictureDescription1?: string;
    /** 照片連結網址2 */
    PictureUrl2?: string;
    /** 照片說明2 */
    PictureDescription2?: string;
    /** 照片連結網址3 */
    PictureUrl3?: string;
    /** 照片說明3 */
    PictureDescription3?: string;
}

/**
 * 經緯度
 *
 * @interface PointType
 */
export interface PointType {
    /** 位置經度 */
    PositionLon?: number;
    /** 位置緯度 */
    PositionLat?: number;
}

/**
 * 圖片
 *
 * @interface Picture
 */
export interface Picture {
    /** 圖片路徑 */
    path?: string;
    /** 圖片說明 */
    alt?: string;
}