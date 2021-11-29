import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestBase } from '../models/request.model';
import { Restaurant, RestaurantTopic } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  /** baseURL */
  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseURLv2}/Tourism/Restaurant`;
  }

  /**
   * 取得[所有]餐飲
   *
   * @param {RequestBase} options 搜尋條件
   * @return {*}  {Observable<Restaurant[]>}
   * @memberof RestaurantService
   */
  getRestaurants(options: RequestBase): Observable<Restaurant[]> {

    /** httpParams */
    const httpParams: HttpParams = new HttpParams({ fromObject: <any>options });

    return this.http.get<Restaurant[]>(`${this.baseURL}?${httpParams.toString()}`);
  }

  /**
   * 取得[縣市]餐飲
   *
   * @param {string} city 縣市
   * @param {RequestBase} options 搜尋條件
   * @return {*}  {Observable<Restaurant[]>}
   * @memberof RestaurantService
   */
  getCityRestaurants(city: string, options: RequestBase): Observable<Restaurant[]> {

    /** httpParams */
    const httpParams: HttpParams = new HttpParams({ fromObject: <any>options });

    return this.http.get<Restaurant[]>(`${this.baseURL}/${city}?${httpParams.toString()}`);
  }

  /**
   * 取得餐飲主題
   *
   * @return {*}  {Observable<RestaurantTopic[]>}
   * @memberof RestaurantService
   */
  getRestaurantTopic(): Observable<RestaurantTopic[]> {
    return this.http.get<RestaurantTopic[]>('./assets/database/restaurant-topic.json');
  }
}
