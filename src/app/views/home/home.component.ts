import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { RequestBase } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Spots } from 'src/app/models/spots.model';
import { ActivityService } from 'src/app/services/activity.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SpotsService } from 'src/app/services/spots.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /** 活動列表 */
  public activities: Activity[] = [];

  /** 景點列表 */
  public spotsList: Spots[] = [];

  /** 餐飲列表 */
  public restaurants: Restaurant[] = [];

  constructor(
    private activityService: ActivityService,
    private spotsService: SpotsService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {

    // 取得ｖ活動
    this.getActivities();

    // 取得景點
    this.getSpotsList();

    // 取得餐飲
    this.getRestaurants();
  }

  /**
   * 取得活動
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
   * 取得景點
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
}
