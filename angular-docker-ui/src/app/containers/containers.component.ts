import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ContainersService} from './containers.service';
import {Router} from '@angular/router';

export interface Element {
  Id: string;
  Names: string;
  Image: number;
  ImageID: number;
  Status: boolean;
}

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  // http://192.168.50.12:4243/containers/json
  runningColumns = ['logo', 'repo_name', 'short_description', 'star_count', 'pull_count', 'is_automated', 'is_official', 'pull_image'];
  runningContainers;

  historyColumns = ['logo', 'Id', 'Names', 'Image', 'ImageID', 'Status'];
  historyContainers;

  constructor(public containersService: ContainersService, private router: Router) { }

  ngOnInit() {
    this.getDockerContainers();
  }

  getDockerContainers() {

    this.historyContainers = new MatTableDataSource<Element>([]);
    this.runningContainers = new MatTableDataSource<Element>([]);

    this.containersService.getContainerList()
      .subscribe(
        data => {
          //  console.log(data);
          this.historyContainers = data;
        }
      );
  }

  getContainerInfo(path: String) {
    this.router.navigateByUrl('/' + path);
  }

}
