import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { City } from '../models/map.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  /** baseURL */
  // private baseURL: string;

  constructor(private http: HttpClient) {
    // this.baseURL = `${environment.baseURLv3}/Map`;
  }

  /**
   * 取得縣市資料
   *
   * @return {*}  {Observable<City[]>}
   * @memberof MapService
   */
  getCities(): Observable<City[]> {
    // return this.http.get<City[]>(`${this.baseURL}/Basic/City`);
    return this.http.get<City[]>('./assets/database/city.json');
  }
}
