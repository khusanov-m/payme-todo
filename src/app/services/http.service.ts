import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _path = '/api';

  constructor(
    private _http: HttpClient,
    private _errHandler: ErrorHandlerService,
    private _cookie: CookieService
  ) {}

  public get<T>(
    url: string,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    return this._http
      .get<T>(this.requestFullPath(url), {
        headers: new HttpHeaders({ ...this.getHeaders, ...headers }),
      })
      .pipe(catchError(this._errHandler.handleError));
  }

  public post<T, K>(
    url: string,
    body: K,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    return this._http
      .post<T>(this.requestFullPath(url), body, {
        headers: new HttpHeaders({ ...this.getHeaders, ...headers }),
      })
      .pipe(catchError(this._errHandler.handleError));
  }

  public delete<T>(
    url: string,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    return this._http
      .delete<T>(this.requestFullPath(url), {
        headers: new HttpHeaders({ ...this.getHeaders, ...headers }),
      })
      .pipe(catchError(this._errHandler.handleError));
  }

  public put<T, K>(
    url: string,
    body: K,
    headers: { [key: string]: string } = {}
  ): Observable<T> {
    return this._http
      .put<T>(this.requestFullPath(url), body, {
        headers: new HttpHeaders({ ...this.getHeaders, ...headers }),
      })
      .pipe(catchError(this._errHandler.handleError));
  }

  private requestFullPath(path: string): string {
    return this._path + path;
  }

  private get getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }
}
