import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

export class Message {
  status: string;
}

@Injectable()
export class ContainerInfoService {

  //  docker server
  protocol = 'http://';
  ip = '';
  port = '';
  path = '/containers';
  containerInfoUrl = '';

  constructor(private http: HttpClient) { }

  retrieveContainerInfo(id: string) {

    this.ip = localStorage.getItem('dockerIp');
    this.port = localStorage.getItem('dockerPort');

    if (this.ip && this.port) {
      this.containerInfoUrl = this.protocol + this.ip + ':' + this.port + this.path + '/' + id + '/json';

      return this.http.get(this.containerInfoUrl).pipe(catchError(this.handleError));
    }
  }

  startContainer(id: string) {
    if (id) {
      const startUrl = this.protocol + this.ip + ':' + this.port + this.path + '/' + id + '/start';

      return this.http.post(startUrl, '')
        .pipe(catchError(this.handleError));
    }
  }

  stopContainer(id: string) {
    if (id) {
      const stopUrl = this.protocol + this.ip + ':' + this.port + this.path + '/' + id + '/stop';

      return this.http.post(stopUrl, '')
        .pipe(catchError(this.handleError));
    }
  }

  removeContainer(id: string){
    if (id) {
      const deleteUrl = this.protocol + this.ip + ':' + this.port + this.path + '/' + id;

      return this.http.delete(deleteUrl)
        .pipe(catchError(this.handleError));
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
