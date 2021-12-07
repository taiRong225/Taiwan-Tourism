import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestBase } from 'src/app/models/request.model';
import { Restaurant } from 'src/app/models/restaurant.model';
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

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
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

    this.restaurantService.getRestaurants(options).subscribe(data => this.restaurant = data[0]);
  }
}
