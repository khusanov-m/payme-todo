import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _path = 'https://joldibaev.uz/api';

  constructor(
    private _http: HttpClient,
    private _errHandler: ErrorHandlerService,
    private _cookie: CookieService
  ) {}

  public get<T>(
    url: string,
    version = 1,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    return this._http
      .get<T>(this.requestFullPath(url, version), {
        headers: new HttpHeaders({ ...this.getHeaders, ...headers }),
      })
      .pipe(catchError(this._errHandler.handleError));
  }

  public post<T, K>(
    url: string,
    body: K,
    version = 1,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    return this._http
      .post<T>(this.requestFullPath(url, version), body, {
        headers: new HttpHeaders({ ...this.getHeaders, ...headers }),
      })
      .pipe(catchError(this._errHandler.handleError));
  }

  public delete<T>(
    url: string,
    version = 1,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    return this._http
      .delete<T>(this.requestFullPath(url, version), {
        headers: new HttpHeaders({ ...this.getHeaders, ...headers }),
      })
      .pipe(catchError(this._errHandler.handleError));
  }

  private requestFullPath(path: string, version: number): string {
    const url = 'v' + version + path;
    return this._path + url;
  }

  private get authToken(): string {
    if (this._cookie.check('token')) {
      const token = JSON.parse(this._cookie.get('token'));
      if (token && token !== '') {
        return token;
      }
      return '';
    }
    return '';
  }

  private get getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${this.authToken}`,
    });
  }
}
