import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RequestBase } from 'src/app/models/request.model';
import { Spots } from 'src/app/models/spots.model';
import { fade } from 'src/app/packages/animations';
import { MapService } from 'src/app/services/map.service';
import { SpotsService } from 'src/app/services/spots.service';

@Component({
  selector: 'app-spots-nearby',
  templateUrl: './spots-nearby.component.html',
  styleUrls: ['./spots-nearby.component.css'],
  animations: [
    fade
  ]
})
export class SpotsNearbyComponent implements OnInit {

  /** 景點 */
  public spots: Spots = {};

  /** 觀光類型 */
  public tourismType: TourismType = 'spots';

  /** 縣市 */
  public city: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotsService: SpotsService,
    private mapService: MapService
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
      this.spots = data[0];

      // 檢查是否有提供縣市
      if (this.spots.City) {
        this.getCities(this.spots.City);
      }
    });
  }

  /**
   * 取得縣市資料
   *
   * @param {string} cityName 縣市名稱
   * @memberof SpotsNearbyComponent
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
   * 導航到景點搜尋頁
   *
   * @return {*}
   * @memberof SpotsNearbyComponent
   */
  navigateToSpotsSearch() {

    // 檢查縣市
    if (!this.city) return;

    /** NavigationExtras */
    let navigationExtras: NavigationExtras = {
      state: {
        city: this.city
      }
    }

    // 頁面導向
    this.router.navigate(['/spots/search'], navigationExtras);
  }
}
