import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {ReversePipe} from 'ngx-pipes';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

@Injectable()
export class HomeService {

  //  docker server
  protocol = 'http://';
  ip = '';
  port = '';
  dockerNodesUrl = '';
  dockerTasksUrl = '';

  constructor(private http: HttpClient) { }

  getNodesList() {

    this.ip = localStorage.getItem('dockerIp');
    this.port = localStorage.getItem('dockerPort');

    if (this.ip && this.port) {
      this.dockerNodesUrl = this.protocol + this.ip + ':' + this.port + '/nodes';

      return this.http.get(this.dockerNodesUrl).pipe(catchError(this.handleError));
    }
  }

  getTasksForNode(nodeId: string) {

    this.ip = localStorage.getItem('dockerIp');
    this.port = localStorage.getItem('dockerPort');

    if (this.ip && this.port) {
      this.dockerTasksUrl = this.protocol + this.ip + ':' + this.port + '/tasks' + '?filters={"node":["' + nodeId + '"]}';

      return this.http.get(this.dockerTasksUrl).pipe(catchError(this.handleError));
    }
  }

  deleteService(id: string) {
    if (id) {
      const deleteUrl = this.protocol + this.ip + ':' + this.port + '/services' + '/' + id;

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
