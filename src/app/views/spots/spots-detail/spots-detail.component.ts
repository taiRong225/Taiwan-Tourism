import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Picture } from 'src/app/models/common.model';
import { RequestBase } from 'src/app/models/request.model';
import { Spots } from 'src/app/models/spots.model';
import { MapService } from 'src/app/services/map.service';
import { SpotsService } from 'src/app/services/spots.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spots-detail',
  templateUrl: './spots-detail.component.html',
  styleUrls: ['./spots-detail.component.css']
})
export class SpotsDetailComponent implements OnInit {

  /** 景點 */
  public spots: Spots = {};

  /** 景點列表 */
  public spotsList: Spots[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotsService: SpotsService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      /** 景點代碼 */
      const ID: string = params.get('ID');

      // 取得景點
      this.getSpots(ID);
    });
  }

  /**
   * 取得景點
   *
   * @param {string} ID 景點代碼
   * @memberof SpotsDetailComponent
   */
  getSpots(ID: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $filter: `ID eq '${ID}'`
    }

    this.spotsService.getSpotsList(options).subscribe(data => {

      /** 新的景點資料 */
      let newSpots: Spots[] = data.map(item => {
        item.TravelInfo = item.TravelInfo || environment.emptyString;
        item.Address = item.Address || environment.emptyString;
        item.TicketInfo = item.TicketInfo || environment.emptyString;
        item.Remarks = item.Remarks || environment.emptyString;
        item.Classes = [];
        item.Pictures = [];

        // 檢查景點類別
        if (item.Class1) item.Classes.push(item.Class1);
        if (item.Class2) item.Classes.push(item.Class2);
        if (item.Class3) item.Classes.push(item.Class3);

        // 檢查圖片1
        if (item.Picture.PictureUrl1) {
          const picture: Picture = {
            path: item.Picture.PictureUrl1,
            alt: item.Picture.PictureDescription1
          }
          item.Pictures.push(picture);
        }

        // 檢查圖片2
        if (item.Picture.PictureUrl2) {
          const picture: Picture = {
            path: item.Picture.PictureUrl2,
            alt: item.Picture.PictureDescription2
          }
          item.Pictures.push(picture);
        }

        // 檢查圖片3
        if (item.Picture.PictureUrl3) {
          const picture: Picture = {
            path: item.Picture.PictureUrl3,
            alt: item.Picture.PictureDescription3
          }
          item.Pictures.push(picture);
        }

        // 檢查圖片陣列資料，若沒有資料的話，直接放一張預設圖
        if (!item.Pictures.length) {
          const picture: Picture = {
            path: environment.noImage1100x400,
            alt: environment.noProvideCity
          }
          item.Pictures.push(picture);
        }

        return item;
      });

      this.spots = newSpots[0];

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
   * @memberof SpotsDetailComponent
   */
  getCities(cityName: string) {
    this.mapService.getCities().subscribe(data => {

      /** 找尋縣市 */
      const findCity = data.find(item => item.CityName == cityName);

      // 檢查縣市比對結果
      if (findCity) {
        this.getCitySpotsList(findCity.City);
      }
    });
  }

  /**
   * 取得[縣市]景點
   *
   * @param {string} city 縣市
   * @return {*}
   * @memberof SpotsDetailComponent
   */
  getCitySpotsList(city: string) {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: environment.perPage,
      $skip: environment.page
    }

    /** 搜尋條件 */
    this.spotsService.getCitySpotsList(city, options).subscribe(data => {

      /** 新的景點資料 */
      let newSpots: Spots[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      this.spotsList = newSpots;
    });
  }
}
