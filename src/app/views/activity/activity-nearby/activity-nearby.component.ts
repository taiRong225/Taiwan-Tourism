import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { RequestBase } from 'src/app/models/request.model';
import { ActivityService } from 'src/app/services/activity.service';

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

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService
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
      $filter: `ID eq '${ID}'`
    }

    this.activityService.getActivities(options).subscribe(data => this.activity = data[0]);
  }
}
