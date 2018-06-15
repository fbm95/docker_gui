import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class SettingsService {

  protocol = 'http://';
  ip = '';
  port = '';
  path = '/version';
  dockerVersionUrl: string;

  constructor(private http: HttpClient) { }

  getVersion() {
    this.dockerVersionUrl = this.protocol + this.ip + ':' + this.port + this.path;
    return this.http.get(this.dockerVersionUrl).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened. Please try again later or connect to a different server');
  }

}
