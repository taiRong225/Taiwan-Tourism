import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestBase } from 'src/app/models/request.model';
import { Spots } from 'src/app/models/spots.model';
import { fade } from 'src/app/packages/animations';
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

  constructor(
    private route: ActivatedRoute,
    private spotsService: SpotsService
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

    this.spotsService.getSpotsList(options).subscribe(data => this.spots = data[0]);
  }
}
