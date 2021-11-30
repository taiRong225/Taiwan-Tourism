import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity, ActivityTopic } from 'src/app/models/activity.model';
import { City } from 'src/app/models/map.model';
import { RequestBase } from 'src/app/models/request.model';
import { fade } from 'src/app/packages/animations';
import { ActivityService } from 'src/app/services/activity.service';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html',
  styleUrls: ['./activity-search.component.css'],
  animations: [
    fade
  ]
})
export class ActivitySearchComponent implements OnInit {

  /** request query base */
  public requestBase: RequestBase = {
    page: environment.page,
    perPage: environment.perPage
  }

  /** 縣市資料 */
  public cities: City[] = [];

  /** 活動主題 */
  public topics: ActivityTopic[] = [];

  /** 是主題 */
  public isTopic: boolean = true;

  /** 活動列表 */
  public activities: Activity[] = [];

  /** 搜尋表單 */
  public searchForm: FormGroup;

  /** 到底了 */
  public isEnd: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapService: MapService,
    private activityService: ActivityService
  ) {

    /** Navigation */
    const navigation = this.router.getCurrentNavigation();

    if (navigation.extras.state) {
      const state = navigation.extras.state as {
        city: string,
        keyword: string
      };

      // 檢查縣市
      if (state.city) {
        setTimeout(() => this.changeCity(state.city), 100);
      }

      // 檢查關鍵字
      if (state.keyword) {
        setTimeout(() => this.changeKeyword(state.keyword), 100);
      }
    }
  }

  ngOnInit(): void {

    // 建立表單
    this.createForm();

    // 取得縣市資料
    this.getCities();

    // 取得活動主題
    this.getActivityTopic();
  }

  /**
   * 取得縣市資料
   *
   * @memberof ActivitySearchComponent
   */
  getCities() {
    this.mapService.getCities().subscribe(data => this.cities = data);
  }

  /**
   * 取得活動主題
   *
   * @memberof ActivitySearchComponent
   */
  getActivityTopic() {
    this.activityService.getActivityTopic().subscribe(data => {
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
   * @memberof ActivitySearchComponent
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
   * @memberof ActivitySearchComponent
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
   * 切換關鍵字
   *
   * @param {string} keyword 關鍵字
   * @memberof ActivitySearchComponent
   */
  changeKeyword(keyword: string) {

    // 更新表單
    this.searchForm.patchValue({
      keyword: keyword
    });

    // 搜尋條件
    this.search();
  }

  /**
   * 建立表單
   *
   * @memberof ActivitySearchComponent
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
   * @memberof ActivitySearchComponent
   */
  search() {
    this.isTopic = false;

    // 初始化
    this.requestBase.page = environment.page;
    this.isEnd = false;

    /** 縣市 */
    const city: string = this.searchForm.get('city').value;

    // 檢查縣市
    if (city !== 'all') {

      // 取得[縣市]活動
      this.getCityActivities(city);

    } else {

      // 取得[所有]景點
      this.getActivities();
    }
  }

  /**
   * 取得[所有]活動
   *
   * @memberof ActivitySearchComponent
   */
  getActivities() {

    /** 搜尋條件 */
    const options: RequestBase = this.getRequestQuery();

    this.activityService.getActivities(options).subscribe(data => {

      // 檢查第一頁，初始化景點列表
      if (this.requestBase.page === 0) {
        this.activities = [];
      }

      // 檢查資料
      if (!data.length) return this.isEnd = true;

      // 檢查是否到底了
      if (this.requestBase.page !== 0 && data.length === 0) {
        return this.isEnd = true;
      }

      /** 新的活動資料 */
      let newActivity: Activity[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      // append data
      this.activities.push(...newActivity);
    });
  }

  /**
   * 取得[縣市]景點
   *
   * @param {string} city 縣市
   * @memberof ActivitySearchComponent
   */
  getCityActivities(city: string) {

    /** 搜尋條件 */
    const options: RequestBase = this.getRequestQuery();

    this.activityService.getCityActivities(city, options).subscribe(data => {

      // 檢查第一頁，初始化景點列表
      if (this.requestBase.page === 0) {
        this.activities = [];
      }

      // 檢查資料
      if (!data.length) return this.isEnd = true;

      // 檢查是否到底了
      if (this.requestBase.page !== 0 && data.length === 0) {
        return this.isEnd = true;
      }

      /** 新的活動資料 */
      let newActivity: Activity[] = data.map(item => {
        item.City = item.City || environment.noProvideCity;
        item.Picture.PictureUrl1 = item.Picture.PictureUrl1 || environment.noImage250x200
        return item;
      });

      // append data
      this.activities.push(...newActivity);
    });
  }

  /**
   * 加載更多
   *
   * @memberof ActivitySearchComponent
   */
  loadMore() {

    // 頁碼+1
    this.requestBase.page++;

    /** 縣市 */
    const city: string = this.searchForm.get('city').value;

    // 檢查縣市
    if (city !== 'all') {

      // 取得[縣市]活動
      this.getCityActivities(city);

    } else {

      // 取得[所有]景點
      this.getActivities();
    }
  }


  /**
   * 取得搜尋條件
   *
   * @return {*}
   * @memberof ActivitySearchComponent
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

      options.$filter = `((contains(Class1, '${topic}') or contains(Class2, '${topic}')) and (contains(Name, '${keyword}') or contains(Address, '${keyword}') or contains(Description, '${keyword}')))`;

    } else {

      // only 主題
      if (topic !== 'all') {
        options.$filter = `(contains(Class1, '${topic}') or contains(Class2, '${topic}'))`;
      }

      // only 關鍵字
      if (keyword) {
        options.$filter = `(contains(Name, '${keyword}') or contains(Address, '${keyword}') or contains(Description, '${keyword}'))`;
      }
    }

    return options;
  }
}
