import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from './home.service';
import {FileSizePipe} from '../pipes/filesize.pipe';
import {forEach} from '@angular/router/src/utils/collection';
import {AppComponent} from '../app.component';
import {browser} from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nodes: any;


  constructor(private router: Router, public homeService: HomeService, public appComponent: AppComponent) { }

  ngOnInit() {
    this.listNodes();
  }

  listNodes() {
    this.homeService.getNodesList().subscribe(
        data => {
          //  console.log(data);
          data.forEach(
            item =>
              this.homeService.getTasksForNode(item.ID).subscribe(
            tasks => {
              item.Tasks = tasks;
            }
          ));
          this.nodes = data;
        }
      );
  }

  getContainerInfo(path: string) {
    this.router.navigateByUrl('/' + path);
  }

  deleteService(id: string){
    this.appComponent.loading = true;
    this.appComponent.openSnackBar('Removing service...');

    this.homeService.deleteService(id).subscribe(
      data => {

        setTimeout(() => {
          window.location.reload();
          this.appComponent.loading = false;
          this.appComponent.openSnackBar('Service removed');
          }, 1000);
      },
      error => {
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Service already removed');
      }
    );
  }


}
