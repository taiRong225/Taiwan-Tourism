import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestBase } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Spots } from 'src/app/models/spots.model';
import { fade } from 'src/app/packages/animations';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SpotsService } from 'src/app/services/spots.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spots-nearby',
  templateUrl: './spots-nearby.component.html',
  styleUrls: ['./spots-nearby.component.css'],
  animations: [
    fade
  ]
})
export class SpotsNearbyComponent implements OnInit {

  /** 距離 */
  public distanceInMeters: number = environment.distanceInMeters;

  /** 景點 */
  public spots: Spots = {};

  /** 景點列表 */
  public spotsList: Spots[] = [];

  /** 餐飲列表 */
  public restaurants: Restaurant[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotsService: SpotsService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {

    /** 景點代碼 */
    const ID: string = this.route.snapshot.paramMap.get('ID');

    // 取得景點
    this.getSpots(ID);
  }

  /**
   * 取得景點
   *
   * @param {string} ID 景點代碼
   * @memberof SpotsNearbyComponent
   */
  getSpots(ID: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $filter: `ID eq '${ID}'`
    }

    this.spotsService.getSpotsList(options).subscribe(data => {

      // 設置景點資料
      this.spots = data[0];

      // 取得附近景點
      this.getNearbySpotsList(this.spots.Position.PositionLon, this.spots.Position.PositionLat);

      // 取得附近餐飲
      this.getNearbyRestaurant(this.spots.Position.PositionLon, this.spots.Position.PositionLat);
    });
  }

  /**
   * 取得附近景點
   *
   * @param {number} PositionLon 經度
   * @param {number} PositionLat 緯度
   * @param {number} [DistanceInMeters=this.distanceInMeters] 範圍
   * @memberof SpotsNearbyComponent
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
      this.spotsList = newSpots.filter(item => item.ID !== this.spots.ID);
    });
  }

  /**
   * 取得附近餐飲
   *
   * @param {number} PositionLon 經度
   * @param {number} PositionLat 緯度
   * @param {number} [DistanceInMeters=this.distanceInMeters] 範圍
   * @memberof SpotsNearbyComponent
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
      this.restaurants = newRestaurant.filter(item => item.ID !== this.spots.ID);
    });
  }
}
