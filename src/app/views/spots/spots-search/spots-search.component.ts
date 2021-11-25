import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/map.model';
import { RequestBase } from 'src/app/models/request.model';
import { Spots, SpotsTopic } from 'src/app/models/spots.model';
import { MapService } from 'src/app/services/map.service';
import { SpotsService } from 'src/app/services/spots.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-spots-search',
  templateUrl: './spots-search.component.html',
  styleUrls: ['./spots-search.component.css']
})
export class SpotsSearchComponent implements OnInit {

  /** request query base */
  public requestBase: RequestBase = {
    page: environment.page,
    perPage: environment.perPage
  }

  /** 縣市資料 */
  public cities: City[] = [];

  /** 景點主題 */
  public topics: SpotsTopic[] = [];

  /** 是主題 */
  public isTopic: boolean = true;

  /** 景點列表 */
  public spotsList: Spots[] = [];

  /** 搜尋表單 */
  public searchForm: FormGroup;

  /** 到底了 */
  public isEnd: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapService: MapService,
    private spotsService: SpotsService
  ) {

    /** Navigation */
    const navigation = this.router.getCurrentNavigation();

    if (navigation.extras.state) {
      const state = navigation.extras.state as {
        city: string,
      };

      // 檢查縣市
      if (state.city) {
        setTimeout(() => this.changeCity(state.city), 100);
      }
    }
  }

  ngOnInit(): void {

    // 建立表單
    this.createForm();

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

  /**
   * 切換景點主題
   *
   * @param {string} topic 主題名稱
   * @memberof SpotsSearchComponent
   */
  changeTopic(topic: string) {

    // 更新表單
    this.searchForm.patchValue({
      topic: topic
    });

    // 搜尋
    this.search();
  }

  /**
   * 切換縣市
   *
   * @param {string} city 縣市
   * @memberof SpotsSearchComponent
   */
  changeCity(city: string) {

    // 更新表單
    this.searchForm.patchValue({
      city: city
    });

    // 搜尋
    this.search();
  }

  /**
   * 建立表單
   *
   * @memberof SpotsSearchComponent
   */
  createForm() {
    this.searchForm = this.fb.group({
      city: ['all'],
      topic: ['all'],
      keyword: ['']
    });
  }

  /**
   * 搜尋
   *
   * @memberof SpotsSearchComponent
   */
  search() {
    this.isTopic = false;

    // 初始化
    this.requestBase.page = environment.page;
    this.spotsList = [];
    this.isEnd = false;

    /** 縣市 */
    const city: string = this.searchForm.get('city').value;

    // 檢查縣市
    if (city !== 'all') {

      // 取得[縣市]景點
      this.getCitySpotsList(city);

    } else {

      // 取得[所有]景點
      this.getSpotsList();
    }
  }

  /**
   * 取得[所有]景點
   *
   * @memberof HomeComponent
   */
  getSpotsList() {

    /** 搜尋條件 */
    const options: RequestBase = this.getRequestQuery();

    this.spotsService.getSpotsList(options).subscribe(data => {

      // 檢查是否到底了
      if (this.requestBase.page !== 0 && data.length === 0) {
        return this.isEnd = true;
      }

      /** 新的景點資料 */
      let newSpots: Spots[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      // append data
      this.spotsList.push(...newSpots);
    });
  }

  /**
   * 取得[縣市]景點
   *
   * @param {string} city 縣市
   * @memberof SpotsSearchComponent
   */
  getCitySpotsList(city: string) {

    /** 搜尋條件 */
    const options: RequestBase = this.getRequestQuery();

    this.spotsService.getCitySpotsList(city, options).subscribe(data => {

      // 檢查資料
      if (!data.length) return this.isEnd = true;

      // 檢查是否到底了
      if (this.requestBase.page !== 0 && data.length === 0) {
        return this.isEnd = true;
      }

      /** 新的景點資料 */
      let newSpots: Spots[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      // append data
      this.spotsList.push(...newSpots);
    });
  }

  /**
   * 加載更多
   *
   * @memberof SpotsSearchComponent
   */
  loadMore() {

    // 頁碼+1
    this.requestBase.page++;

    /** 縣市 */
    const city: string = this.searchForm.get('city').value;

    // 檢查縣市
    if (city !== 'all') {

      // 取得[縣市]景點
      this.getCitySpotsList(city);

    } else {

      // 取得[所有]景點
      this.getSpotsList();
    }
  }


  /**
   * 取得搜尋條件
   *
   * @return {*}
   * @memberof SpotsSearchComponent
   */
  getRequestQuery() {

    /** 搜尋條件 */
    const options: RequestBase = {
      $top: this.requestBase.perPage,
      $skip: this.requestBase.page * this.requestBase.perPage
    }

    /** 主題 */
    const topic: string = this.searchForm.get('topic').value;

    /** 關鍵字 */
    const keyword: string = this.searchForm.get('keyword').value;

    // 主題 and 關鍵字
    if (topic !== 'all' && keyword) {

      options.$filter = `((contains(Class1, '${topic}') or contains(Class2, '${topic}') or contains(Class3, '${topic}')) and (contains(Name, '${keyword}') or contains(Address, '${keyword}') or contains(Description, '${keyword}')))`;

    } else {

      // only 主題
      if (topic !== 'all') {
        options.$filter = `(contains(Class1, '${topic}') or contains(Class2, '${topic}') or contains(Class3, '${topic}'))`;
      }

      // only 關鍵字
      if (keyword) {
        options.$filter = `(contains(Name, '${keyword}') or contains(Address, '${keyword}') or contains(Description, '${keyword}'))`;
      }
    }

    return options;
  }
}
