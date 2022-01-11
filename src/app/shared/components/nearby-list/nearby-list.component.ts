import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { RequestBase } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Spots } from 'src/app/models/spots.model';
import { fade } from 'src/app/packages/animations';
import { ActivityService } from 'src/app/services/activity.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SpotsService } from 'src/app/services/spots.service';
import { environment } from 'src/environments/environment';
import * as common from '../../../packages/common';

@Component({
  selector: 'app-nearby-list',
  templateUrl: './nearby-list.component.html',
  styleUrls: ['./nearby-list.component.css'],
  animations: [
    fade
  ]
})
export class NearbyListComponent implements OnInit {

  /** 代碼 */
  @Input() ID: string;

  /** 觀光類型 */
  @Input() TourismType: TourismType;

  /** 經度 */
  @Input() PositionLon: number;

  /** 緯度 */
  @Input() PositionLat: number;

  /** 距離 */
  public distanceInMeters: number = environment.distanceInMeters;

  /** 景點列表 */
  public spotsList: Spots[] = [];

  /** 餐飲列表 */
  public restaurants: Restaurant[] = [];

  /** 活動列表 */
  public activities: Activity[] = [];

  constructor(
    private spotsService: SpotsService,
    private restaurantService: RestaurantService,
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {

    // 取得附近景點
    this.getNearbySpotsList(this.PositionLon, this.PositionLat);

    // 取得附近餐飲
    this.getNearbyRestaurant(this.PositionLon, this.PositionLat);

    // 取得附近活動
    this.getNearbyActivity(this.PositionLon, this.PositionLat);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const element: HTMLElement = document.querySelector(window.location.hash);
      common.scrollToElement(element);
    }, 1000);
  }

  /**
   * 取得附近景點
   *
   * @param {number} PositionLon 經度
   * @param {number} PositionLat 緯度
   * @param {number} [DistanceInMeters=this.distanceInMeters] 範圍
   * @memberof NearbyListComponent
   */
  getNearbySpotsList(PositionLon: number, PositionLat: number, DistanceInMeters: number = this.distanceInMeters) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $spatialFilter: `nearby(Position, ${PositionLat}, ${PositionLon}, ${DistanceInMeters})`
    }

    this.spotsService.getSpotsList(options).subscribe(data => {

      /** 新的景點資料 */
      let newSpots: Spots[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      // 過濾掉自己
      this.spotsList = newSpots.filter(item => item.ScenicSpotID !== this.ID);
    });
  }

  /**
   * 取得附近餐飲
   *
   * @param {number} PositionLon 經度
   * @param {number} PositionLat 緯度
   * @param {number} [DistanceInMeters=this.distanceInMeters] 範圍
   * @memberof NearbyListComponent
   */
  getNearbyRestaurant(PositionLon: number, PositionLat: number, DistanceInMeters: number = this.distanceInMeters) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $spatialFilter: `nearby(Position, ${PositionLat}, ${PositionLon}, ${DistanceInMeters})`
    }

    this.restaurantService.getRestaurants(options).subscribe(data => {

      /** 新的餐飲資料 */
      let newRestaurant: Restaurant[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      // 過濾掉自己
      this.restaurants = newRestaurant.filter(item => item.ID !== this.ID);
    });
  }

  /**
   * 取得附近活動
   *
   * @param {number} PositionLon 經度
   * @param {number} PositionLat 緯度
   * @param {number} [DistanceInMeters=this.distanceInMeters] 範圍
   * @memberof NearbyListComponent
   */
  getNearbyActivity(PositionLon: number, PositionLat: number, DistanceInMeters: number = this.distanceInMeters) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $spatialFilter: `nearby(Position, ${PositionLat}, ${PositionLon}, ${DistanceInMeters})`
    }

    this.activityService.getActivities(options).subscribe(data => {

      /** 新的活動資料 */
      let newsActivity: Restaurant[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      // 過濾掉自己
      this.activities = newsActivity.filter(item => item.ID !== this.ID);
    });
  }

}
