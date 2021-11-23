import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestBase } from '../models/request.model';
import { Restaurant } from '../models/restaurant.model';

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
}
