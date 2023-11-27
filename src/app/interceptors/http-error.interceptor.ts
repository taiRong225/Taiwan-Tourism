import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // 檢查登入狀態
        if (this.authService.isLoggedIn()) {
            request = this.addToken(request, this.authService.getAuth());
        }

        return next.handle(request).pipe(catchError(error => {
            console.log(error);

            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.authService.removeAuth();
                window.location.reload();
            }

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
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                authorization: `Bearer ${token}`
            }
        });
    }
}