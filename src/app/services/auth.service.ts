import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JWT } from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** jwt_key */
  private key: string;

  constructor(private http: HttpClient) {
    this.key = environment.keyOfAuth;
  }

  /**
   * 已登入會員
   *
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.key);
  }

  /**
   * 取得JWT
   *
   * @return {*}  {string}
   * @memberof AuthService
   */
  getAuth(): string {
    return localStorage.getItem(this.key);
  }

  /**
   * 設置JWT
   *
   * @param {string} token JWT
   * @memberof AuthService
   */
  setAuth(token: string) {
    if (token) localStorage.setItem(this.key, token);
  }

  getAuthorizationHeader(): Observable<JWT> {
    const authUri: string = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Content-Encoding': 'br,gzip',
      }),
    }

    const parameter = new URLSearchParams();
    parameter.set('grant_type', 'client_credentials');
    parameter.set('client_id', environment.CLIENT_ID);
    parameter.set('client_secret', environment.CLIENT_SECRET);

    return this.http.post<JWT>(authUri, parameter.toString(), httpOptions);
  }
}
