import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestBase } from '../models/request.model';
import { Spots, SpotsTopic } from '../models/spots.model';

@Injectable({
  providedIn: 'root'
})
export class SpotsService {

  /** baseURL */
  private baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = `${environment.baseURLv2}/Tourism/ScenicSpot`;
  }

  /**
   * 取得[所有]景點
   *
   * @param {RequestBase} options 搜尋條件
   * @return {*}  {Observable<Spots[]>}
   * @memberof SpotsService
   */
  getSpotsList(options: RequestBase): Observable<Spots[]> {

    /** httpParams */
    const httpParams: HttpParams = new HttpParams({ fromObject: <any>options });

    return this.http.get<Spots[]>(`${this.baseURL}?${httpParams.toString()}`);
  }

  /**
   *
   * 取得[縣市]景點
   *
   * @param {string} city 縣市
   * @param {RequestBase} options 搜尋條件
   * @return {*}  {Observable<Spots[]>}
   * @memberof SpotsService
   */
  getCitySpotsList(city: string, options: RequestBase): Observable<Spots[]> {

    /** httpParams */
    const httpParams: HttpParams = new HttpParams({ fromObject: <any>options });

    return this.http.get<Spots[]>(`${this.baseURL}/${city}?${httpParams.toString()}`);
  }

  /**
   * 取得景點主題
   *
   * @return {*}  {Observable<SpotsTopic[]>}
   * @memberof SpotsService
   */
  getSpotsTopic(): Observable<SpotsTopic[]> {
    return this.http.get<SpotsTopic[]>('./assets/database/spots-topic.json');
  }
}
