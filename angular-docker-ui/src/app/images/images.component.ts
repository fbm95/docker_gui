import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource } from '@angular/material';
import {ImagesService} from './images.service';
import {MatProgressBarModule } from '@angular/material';
import {AppComponent} from '../app.component';
import {Router} from '@angular/router';

export interface LoaderState {
  show: boolean;
}

export interface Element {
  repo_name: string;
  short_description: string;
  star_count: number;
  pull_count: number;
  is_automated: boolean;
  is_official: boolean;
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  providers: [ ImagesService ],
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, AfterViewInit {

  repoColumns = ['logo', 'repo_name', 'short_description', 'star_count', 'pull_count', 'is_automated', 'is_official', 'pull_image'];
  repoImages;

  dockerColumns = ['logo', 'Id', 'RepoTags', 'Created', 'VirtualSize', 'remove_image'];
  dockerImages;

  // flags
  // downloading: boolean;

  query: string;

  constructor( public imagesService: ImagesService, public appComponent: AppComponent, private router: Router) { }

  ngOnInit() {
    this.imagesService.page = 0;
    this.imagesService.query = '';
    this.getDockerImages();

  }

  ngAfterViewInit() {

  }

  download(fromImage: string) {
    this.appComponent.loading = true;
    this.appComponent.openSnackBar('Downloading...');

    this.imagesService.pullDockerImage(fromImage, 'latest')
      .subscribe(
      data => {
        // console.log(data);
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Download finished');
        this.getDockerImages();
      }
    );
  }

  delete(id: string){
    this.appComponent.loading = true;
    this.appComponent.openSnackBar('Deleting image');


    this.imagesService.removeDockerImage(id)
      .subscribe(
        data => {
          console.log(data);
          this.appComponent.loading = false;
          this.appComponent.openSnackBar('Image removed');
          this.getDockerImages();
        }
      );
  }


  getDockerImages() {

    this.dockerImages = new MatTableDataSource<Element>([]);

    this.imagesService.queryDockerServer()
      .subscribe(
        data => {
          //  console.log(data);
          this.dockerImages = data;
        }
      );
  }

  search(page: number) {
    //  this.clear();
    this.repoImages = new MatTableDataSource<Element> ([]);
    this.imagesService.query = this.query;
    this.imagesService.page = page;

    this.imagesService.queryDockerHub()
      .subscribe(
        data => {
          // console.log(this.imagesService.queryUrl);
          this.repoImages = data.results;
        }
        );
  }

  public getNextPage() {
    this.search(this.imagesService.page + 1);
  }

  public getPreviousPage() {
    if (this.imagesService.page - 1 >= 1) {
      this.search(this.imagesService.page - 1);
    }
  }

  clear() {
    this.repoImages = new MatTableDataSource<Element>([]) ;

  }

  getImageInfo(path: String){
    this.router.navigateByUrl('/' + path);
  }

}
