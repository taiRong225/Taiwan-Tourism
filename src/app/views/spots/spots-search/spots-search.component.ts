import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/map.model';
import { SpotsTopic } from 'src/app/models/spots.model';
import { MapService } from 'src/app/services/map.service';
import { SpotsService } from 'src/app/services/spots.service';

@Component({
  selector: 'app-spots-search',
  templateUrl: './spots-search.component.html',
  styleUrls: ['./spots-search.component.css']
})
export class SpotsSearchComponent implements OnInit {

  /** 縣市資料 */
  public cities: City[] = [];

  /** 景點主題 */
  public topics: SpotsTopic[] = [];

  constructor(
    private mapService: MapService,
    private spotsService: SpotsService
  ) { }

  ngOnInit(): void {

    // 取得縣市資料
    this.getCities();

    // 取得景點主題
    this.getSpotsTopic();
  }

  /**
   * 取得縣市資料
   *
   * @memberof SpotsSearchComponent
   */
  getCities() {
    this.mapService.getCities().subscribe(data => this.cities = data);
  }

  /**
   * 取得景點主題
   *
   * @memberof SpotsSearchComponent
   */
  getSpotsTopic() {
    this.spotsService.getSpotsTopic().subscribe(data => {
      this.topics = data.map(item => {
        item.path = `assets/${item.path}`;
        return item;
      });
    });
  }
}
