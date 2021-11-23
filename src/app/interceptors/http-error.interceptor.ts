import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jsSHA from 'jssha';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // 加入 Http Reauest Header
        request = this.addToken(request, this.getAuthorizationHeader());

        return next.handle(request).pipe(catchError(error => {
            console.log(error);

            return throwError(error);
        }));
    }

    /**
     * add Token to request header
     *
     * @private
     * @param {HttpRequest<any>} request request
     * @param {string} token JWT
     * @return {*}
     * @memberof HttpErrorInterceptor
     */
    private addToken(request: HttpRequest<any>, headers: any) {
        return request.clone({
            setHeaders: headers
        });
    }

    /**
     * 取得 API 驗證用Token
     *
     * @private
     * @return {*}
     * @memberof HttpErrorInterceptor
     */
    private getAuthorizationHeader() {
        var AppID = environment.APP_ID;
        var AppKey = environment.APP_KEY;
        var GMTString = new Date().toUTCString();
        var ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        var HMAC = ShaObj.getHMAC('B64');
        var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

        // 如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
        return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ };
    }
}