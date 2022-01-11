import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { RequestBase } from 'src/app/models/request.model';
import { ActivityService } from 'src/app/services/activity.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-activity-nearby',
  templateUrl: './activity-nearby.component.html',
  styleUrls: ['./activity-nearby.component.css']
})
export class ActivityNearbyComponent implements OnInit {

  /** 活動 */
  public activity: Activity = {};

  /** 觀光類型 */
  public tourismType: TourismType = 'activity';

  /** 縣市 */
  public city: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {

    /** 活動代碼 */
    const ID: string = this.route.snapshot.paramMap.get('ID');

    // 取得活動
    this.getActivity(ID);
  }

  /**
   * 取得活動
   *
   * @param {string} ID 活動代碼
   * @memberof ActivityNearbyComponent
   */
  getActivity(ID: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $filter: `ActivityID eq '${ID}'`
    }

    this.activityService.getActivities(options).subscribe(data => {
      this.activity = data[0];

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
   * @memberof ActivityNearbyComponent
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
   * 導航到活動搜尋頁
   *
   * @return {*}
   * @memberof ActivityNearbyComponent
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
}
