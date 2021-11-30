import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity, ActivityTopic } from '../models/activity.model';
import { RequestBase } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  /** baseURL */
  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseURLv2}/Tourism/Activity`;
  }

  /**
   * 取得[所有]活動
   *
   * @param {RequestBase} options 搜尋條件
   * @return {*}  {Observable<Activity[]>}
   * @memberof ActivityService
   */
  getActivities(options: RequestBase): Observable<Activity[]> {

    /** httpParams */
    const httpParams: HttpParams = new HttpParams({ fromObject: <any>options });

    return this.http.get<Activity[]>(`${this.baseURL}?${httpParams.toString()}`);
  }

  /**
   * 取得[縣市]活動
   *
   * @param {string} city 縣市
   * @param {RequestBase} options 搜尋條件
   * @return {*}  {Observable<Activity[]>}
   * @memberof ActivityService
   */
  getCityActivities(city: string, options: RequestBase): Observable<Activity[]> {

    /** httpParams */
    const httpParams: HttpParams = new HttpParams({ fromObject: <any>options });

    return this.http.get<Activity[]>(`${this.baseURL}/${city}?${httpParams.toString()}`);
  }

  /**
   * 取得活動主題
   *
   * @return {*}  {Observable<ActivityTopic[]>}
   * @memberof ActivityService
   */
  getActivityTopic(): Observable<ActivityTopic[]> {
    return this.http.get<ActivityTopic[]>('./assets/database/activity-topic.json');
  }
}
