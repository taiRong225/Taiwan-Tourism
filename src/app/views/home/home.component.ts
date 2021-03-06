import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Carousel } from 'src/app/models/carousel.model';
import { RequestBase } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Spots } from 'src/app/models/spots.model';
import { fade } from 'src/app/packages/animations';
import { ActivityService } from 'src/app/services/activity.service';
import { MapService } from 'src/app/services/map.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SpotsService } from 'src/app/services/spots.service';
import { environment } from 'src/environments/environment';
import * as common from '../../packages/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {

  /** 活動列表 */
  public activities: Activity[] = [];

  /** 景點列表 */
  public spotsList: Spots[] = [];

  /** 餐飲列表 */
  public restaurants: Restaurant[] = [];

  /** 輪播列表 */
  public carousels: Carousel[] = [];

  /** 輪播當前索引 */
  public activeSlideIndex: number = 0;

  /** 觀光類型 Select */
  @ViewChild('tourismTypeSelect') tourismTypeSelect: ElementRef;

  /** 關鍵字 Input */
  @ViewChild('keywordInput') keywordInput: ElementRef;

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private spotsService: SpotsService,
    private restaurantService: RestaurantService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {

    // 取得縣市資料
    this.getCities();
  }

  /**
   * 取得活動列表
   *
   * @memberof HomeComponent
   */
  getActivities() {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: 4,
      $orderby: 'StartTime desc'
    }

    this.activityService.getActivities(options).subscribe(data => {
      this.activities = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage160x160;
        return item;
      });
    });
  }

  /**
   * 取得景點列表
   *
   * @memberof HomeComponent
   */
  getSpotsList() {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: 4
    }

    this.spotsService.getSpotsList(options).subscribe(data => {
      this.spotsList = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200;
        return item;
      });
    });
  }

  /**
   * 取得餐飲列表
   *
   * @memberof HomeComponent
   */
  getRestaurants() {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: 4
    }

    this.restaurantService.getRestaurants(options).subscribe(data => {
      this.restaurants = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200;
        return item;
      });
    });
  }

  /**
   * 取得縣市資料
   *
   * @memberof HomeComponent
   */
  getCities() {
    this.mapService.getCities().subscribe(data => {

      /** 隨機亂數索引 */
      const index: number = common.getRandom(data.length);

      /** 縣市 */
      const city: string = data[index].City;

      // 取得輪播列表
      this.getCarousels(city);

      // 取得活動列表
      this.getActivities();

      // 取得景點列表
      this.getSpotsList();

      // 取得餐飲列表
      this.getRestaurants();
    });
  }

  /**
   * 取得輪播列表
   *
   * @memberof HomeComponent
   */
  getCarousels(city: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: 2,
      $filter: 'Picture/PictureUrl1 ne null and City ne null',
      $orderby: 'SrcUpdateTime desc'
    }

    // 景點
    this.spotsService.getCitySpotsList(city, options).subscribe(data => {

      // 新的輪播資料
      const carousels: Carousel[] = data.map(item => {
        const obj: Carousel = {
          ID: item.ScenicSpotID,
          title: item.ScenicSpotName,
          subTitle: item.City,
          path: item.Picture.PictureUrl1,
          alt: item.Picture.PictureDescription2,
          tourismType: 'spots'
        }
        return obj;
      });

      // append data
      this.carousels.push(...carousels);
    });

    // 餐飲
    this.restaurantService.getCityRestaurants(city, options).subscribe(data => {

      // 新的輪播資料
      const carousels: Carousel[] = data.map(item => {
        const obj: Carousel = {
          ID: item.RestaurantID,
          title: item.RestaurantName,
          subTitle: item.City,
          path: item.Picture.PictureUrl1,
          alt: item.Picture.PictureDescription2,
          tourismType: 'restaurant'
        }
        return obj;
      });

      // append data
      this.carousels.push(...carousels);
    });

    // 活動
    this.activityService.getCityActivities(city, options).subscribe(data => {

      // 新的輪播資料
      const carousels: Carousel[] = data.map(item => {
        const obj: Carousel = {
          ID: item.ActivityID,
          title: item.ActivityName,
          subTitle: item.City,
          path: item.Picture.PictureUrl1,
          alt: item.Picture.PictureDescription2,
          tourismType: 'activity'
        }
        return obj;
      });

      // append data
      this.carousels.push(...carousels);
    });
  }

  /**
   * 導航到搜尋頁
   *
   * @return {*}
   * @memberof HomeComponent
   */
  navigateToSearch() {

    /** 觀光類型 */
    const tourismType: TourismType = this.tourismTypeSelect.nativeElement.value;

    /** 關鍵字 */
    const keyword: string = this.keywordInput.nativeElement.value;

    /** NavigationExtras */
    let navigationExtras: NavigationExtras = {
      state: {
        keyword: keyword
      }
    }

    // 比對觀光類型
    switch (tourismType) {

      // 導向觀光景點
      case 'spots':
        this.router.navigate(['/spots/search'], navigationExtras); break;

      // 導向觀光餐飲
      case 'restaurant':
        this.router.navigate(['/restaurant/search'], navigationExtras); break;

      // 導向觀光活動
      case 'activity':
        this.router.navigate(['/activity/search'], navigationExtras); break;
    }
  }

  /**
   * 切換輪播
   *
   * @param {number} index 輪播索引
   * @memberof HomeComponent
   */
  switchSlide(index: number) {
    console.log(index);

    this.activeSlideIndex = index;
  }
}
