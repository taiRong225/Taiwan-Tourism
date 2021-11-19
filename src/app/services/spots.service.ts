import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestBase } from '../models/request.model';
import { Spots } from '../models/spots.model';

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
}
