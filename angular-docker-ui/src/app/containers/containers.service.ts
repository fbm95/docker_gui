import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

@Injectable()
export class ContainersService {

  //  docker server
  protocol = 'http://';
  ip = '';
  port = '';
  path = '/containers/json';
  dockerContainersUrl = '';

  constructor(private http: HttpClient) { }

  getContainerList() {

    this.ip = localStorage.getItem('dockerIp');
    this.port = localStorage.getItem('dockerPort');

    if (this.ip && this.port) {
      this.dockerContainersUrl = this.protocol + this.ip + ':' + this.port + this.path + '?all=1';

      return this.http.get(this.dockerContainersUrl).pipe(catchError(this.handleError));
    }
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
