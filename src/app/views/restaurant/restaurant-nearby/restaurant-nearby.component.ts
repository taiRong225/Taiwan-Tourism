import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RequestBase } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { MapService } from 'src/app/services/map.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-nearby',
  templateUrl: './restaurant-nearby.component.html',
  styleUrls: ['./restaurant-nearby.component.css']
})
export class RestaurantNearbyComponent implements OnInit {

  /** 餐飲 */
  public restaurant: Restaurant = {};

  /** 觀光類型 */
  public tourismType: TourismType = 'restaurant';

  /** 縣市 */
  public city: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {

    /** 餐飲代碼 */
    const ID: string = this.route.snapshot.paramMap.get('ID');

    // 取得餐飲
    this.getRestaurant(ID);
  }

  /**
   * 取得餐飲
   *
   * @param {string} ID 餐飲代碼
   * @memberof RestaurantNearbyComponent
   */
  getRestaurant(ID: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $filter: `ID eq '${ID}'`
    }

    this.restaurantService.getRestaurants(options).subscribe(data => {
      this.restaurant = data[0];

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
   * @memberof RestaurantNearbyComponent
   */
  getCities(cityName: string) {
    this.mapService.getCities().subscribe(data => {

      /** 找尋縣市 */
      const findCity = data.find(item => item.CityName == cityName);

      // 檢查縣市比對結果
      if (findCity) {

        // 更新縣市
        this.city = findCity.City;
      }
    });
  }

  /**
   * 導航到餐飲搜尋頁
   *
   * @return {*}
   * @memberof RestaurantNearbyComponent
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
