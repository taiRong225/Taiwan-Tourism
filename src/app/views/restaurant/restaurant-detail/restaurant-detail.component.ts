import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Picture } from 'src/app/models/common.model';
import { RequestBase } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { fade } from 'src/app/packages/animations';
import { MapService } from 'src/app/services/map.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
  animations: [
    fade
  ]
})
export class RestaurantDetailComponent implements OnInit {

  /** 餐飲 */
  public restaurant: Restaurant = {};

  /** 餐飲列表 */
  public restaurants: Restaurant[] = [];

  /** 縣市 */
  public city: string = '';

  /** 提供地址 (Google Map) */
  public hasAddress: boolean = false;

  /** 輪播當前索引 */
  public activeSlideIndex: number = 0;

  /** 觀光類型 */
  public tourismType: TourismType = 'restaurant';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      /** 餐飲代碼 */
      const ID: string = params.get('ID');

      // 取得餐飲
      this.getRestaurant(ID);
    });
  }

  /**
   * 取得餐飲
   *
   * @param {string} ID 餐飲代碼
   * @memberof RestaurantDetailComponent
   */
  getRestaurant(ID: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $filter: `ID eq '${ID}'`
    }

    this.restaurantService.getRestaurants(options).subscribe(data => {

      /** 新的餐飲資料 */
      let newRestaurant: Restaurant[] = data.map(item => {

        // 檢查地址
        if (item.Address) this.hasAddress = true;

        item.OpenTime = item.OpenTime || environment.emptyString;
        item.Address = item.Address || environment.emptyString;
        item.WebsiteUrl = item.WebsiteUrl || environment.emptyString;
        item.Pictures = [];

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

      this.restaurant = newRestaurant[0];

      // 初始化輪播當前索引
      this.activeSlideIndex = 0;

      // 檢查是否有提供縣市
      if (this.restaurant.City) {
        this.getCities(this.restaurant.City);
      }
    });
  }

  /**
   * 取得縣市資料
   *
   * @param {string} cityName 縣市名稱
   * @memberof RestaurantDetailComponent
   */
  getCities(cityName: string) {
    this.mapService.getCities().subscribe(data => {

      /** 找尋縣市 */
      const findCity = data.find(item => item.CityName == cityName);

      // 檢查縣市比對結果
      if (findCity) {

        // 取得[縣市]餐飲
        this.getCityRestaurants(findCity.City);

        // 更新縣市
        this.city = findCity.City;
      }
    });
  }

  /**
   * 取得[縣市]餐飲
   *
   * @param {string} city 縣市
   * @return {*}
   * @memberof RestaurantDetailComponent
   */
  getCityRestaurants(city: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: 4,
      $filter: `ID ne '${this.restaurant.ID}'` // 過濾掉自己
    }

    this.restaurantService.getCityRestaurants(city, options).subscribe(data => {

      /** 新的餐飲資料 */
      let newRestaurant: Restaurant[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      this.restaurants = newRestaurant;
    });
  }

  /**
   * 導航到餐飲搜尋頁
   *
   * @return {*}
   * @memberof RestaurantDetailComponent
   */
  navigateToRestaurantSearch() {

    // 檢查縣市
    if (!this.city) return;

    /** NavigationExtras */
    let navigationExtras: NavigationExtras = {
      state: {
        city: this.city
      }
    }

    // 頁面導向
    this.router.navigate(['/restaurant/search'], navigationExtras);
  }
}
