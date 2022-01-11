import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Picture } from 'src/app/models/common.model';
import { RequestBase } from 'src/app/models/request.model';
import { fade } from 'src/app/packages/animations';
import { ActivityService } from 'src/app/services/activity.service';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css'],
  animations: [
    fade
  ]
})
export class ActivityDetailComponent implements OnInit {

  /** 活動 */
  public activity: Activity = {};

  /** 活動列表 */
  public activities: Activity[] = [];

  /** 縣市 */
  public city: string = '';

  /** 提供地址 (Google Map) */
  public hasAddress: boolean = false;

  /** 輪播當前索引 */
  public activeSlideIndex: number = 0;

  /** 觀光類型 */
  public tourismType: TourismType = 'activity';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      /** 活動代碼 */
      const ID: string = params.get('ID');

      // 取得活動
      this.getActivity(ID);
    });
  }

  /**
   * 取得活動
   *
   * @param {string} ID 活動代碼
   * @memberof ActivityDetailComponent
   */
  getActivity(ID: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $filter: `ActivityID eq '${ID}'`
    }

    this.activityService.getActivities(options).subscribe(data => {

      /** 新的活動資料 */
      let newActivity: Activity[] = data.map(item => {

        // 檢查地址
        if (item.Address) this.hasAddress = true;

        item.City = item.City || environment.noProvideCity;
        item.TravelInfo = item.TravelInfo || environment.emptyString;
        item.Address = item.Address || environment.emptyString;
        item.WebsiteUrl = item.WebsiteUrl || environment.emptyString;
        item.charge = item.charge || environment.emptyString;
        item.Remarks = item.Remarks || environment.emptyString;
        item.Classes = [];
        item.Pictures = [];

        // 檢查活動類別
        if (item.Class1) item.Classes.push(item.Class1);
        if (item.Class2) item.Classes.push(item.Class2);

        // 檢查圖片1
        if (item.Picture.PictureUrl1) {
          const picture: Picture = {
            path: item.Picture.PictureUrl1,
            alt: item.Picture.PictureDescription1
          }
          item.Pictures.push(picture);
        }

        // 檢查圖片2
        if (item.Picture.PictureUrl2) {
          const picture: Picture = {
            path: item.Picture.PictureUrl2,
            alt: item.Picture.PictureDescription2
          }
          item.Pictures.push(picture);
        }

        // 檢查圖片3
        if (item.Picture.PictureUrl3) {
          const picture: Picture = {
            path: item.Picture.PictureUrl3,
            alt: item.Picture.PictureDescription3
          }
          item.Pictures.push(picture);
        }

        // 檢查圖片陣列資料，若沒有資料的話，直接放一張預設圖
        if (!item.Pictures.length) {
          const picture: Picture = {
            path: environment.noImage1100x400,
            alt: environment.noProvideCity
          }
          item.Pictures.push(picture);
        }

        return item;
      });

      this.activity = newActivity[0];

      // 初始化輪播當前索引
      this.activeSlideIndex = 0;

      // 檢查是否有提供縣市
      if (this.activity.City) {
        this.getCities(this.activity.City);
      }
    });
  }

  /**
   * 取得縣市資料
   *
   * @param {string} cityName 縣市名稱
   * @memberof ActivityDetailComponent
   */
  getCities(cityName: string) {
    this.mapService.getCities().subscribe(data => {

      /** 找尋縣市 */
      const findCity = data.find(item => item.CityName == cityName);

      // 檢查縣市比對結果
      if (findCity) {

        // 取得[縣市]活動
        this.getCityActivities(findCity.City);

        // 更新縣市
        this.city = findCity.City;
      }
    });
  }

  /**
   * 取得[縣市]活動
   *
   * @param {string} city 縣市
   * @memberof ActivityDetailComponent
   */
  getCityActivities(city: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: 4,
      $filter: `ActivityID ne '${this.activity.ActivityID}'` // 過濾掉自己
    }

    this.activityService.getCityActivities(city, options).subscribe(data => {

      /** 新的活動資料 */
      let newActivity: Activity[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      this.activities = newActivity;
    });
  }

  /**
   * 導航到活動搜尋頁
   *
   * @return {*}
   * @memberof ActivityDetailComponent
   */
  navigateToActivitySearch() {

    // 檢查縣市
    if (!this.city) return;

    /** NavigationExtras */
    let navigationExtras: NavigationExtras = {
      state: {
        city: this.city
      }
    }

    // 頁面導向
    this.router.navigate(['/activity/search'], navigationExtras);
  }

  /**
   * 切換輪播
   *
   * @param {number} index 輪播索引
   * @memberof ActivityDetailComponent
   */
  switchSlide(index: number) {
    this.activeSlideIndex = index;
  }
}
