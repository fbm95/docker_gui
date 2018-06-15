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
export class ImagesService {
  // docker hub
  // https://hub.docker.com/v2/search/repositories/?page=1&query=java
  // cryptic-headland-94862.herokuapp.com/
  // cors-anywhere.herokuapp.com/
  url = 'https://cryptic-headland-94862.herokuapp.com/https://hub.docker.com/v2/search/repositories';
  page = 0;
  query = '';
  queryUrl = '';

  //  docker server
  protocol = 'http://';
  ip = '';
  port = '';
  path = '/images/json';
  dockerImagesUrl = '';

  constructor(private http: HttpClient) { }

  queryDockerHub() {
    if (this.query) {
      this.queryUrl = this.url + '/?page=' + this.page + '&query=' + this.query;
      return this.http.get(this.queryUrl).pipe(catchError(this.handleError));
    }
  }

  queryDockerServer() {

    this.ip = localStorage.getItem('dockerIp');
    this.port = localStorage.getItem('dockerPort');

    if (this.ip && this.port) {
        this.dockerImagesUrl = this.protocol + this.ip + ':' + this.port + this.path;

        return this.http.get(this.dockerImagesUrl).pipe(catchError(this.handleError));
    }
  }

  pullDockerImage(fromImage: string, tag: string) {
    if (fromImage && tag) {
      const pullUrl = '/images/create' + '?fromImage=' + fromImage + '&tag=' + tag;

      return this.http.post(pullUrl, '')
        .pipe(catchError(this.dockerImageError));

    }
  }

  removeDockerImage(id: string) {
    if (id) {
      // this.protocol + '192.168.50.12' + ':' + this.port +
      const deleteUrl = '/images/' + id;

      return this.http.delete(deleteUrl)
        .pipe(catchError(this.handleError));

    }
  }

  private dockerImageError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status !== 200) {
        console.log(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    }

    if (error.status !== 200) {
      // return an ErrorObservable with a user-facing error message
      return new ErrorObservable(
        'Something bad happened. Please try again later or connect to a different server');
    } else {
      const message = new Message();
      message.status = 'downloaded';

      return Observable.of(message).map(o => JSON.stringify(o));
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
