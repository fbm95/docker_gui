import { Component, OnInit } from '@angular/core';
import {ImageInfoService} from './image-info.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {MatDialog} from '@angular/material';
import {ContainerCreateDialogComponent} from '../container-create-dialog/container-create-dialog.component';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.css']
})
export class ImageInfoComponent implements OnInit {

  id: string;
  name: string;
  tags: string;

  cmd: string;
  volumes: string;
  environment: string;
  workingDir: string;

  exposedPorts: string;
  author: string;
  os: string;
  architecture: string;
  created: string;

  imageInfoJson: any;
  containerConfigJson: any;

  constructor(public imageInfoService: ImageInfoService, private router: Router,
              public appComponent: AppComponent, public dialog: MatDialog) { }

  ngOnInit() {
    const url = this.router.url;
    this.id = url.substr(7);
    this.getImageInto(this.id);
  }

  openDialog() {
    // initialize json with sample data from image info
    this.containerConfigJson = this.imageInfoJson.ContainerConfig;
    this.containerConfigJson.Image = this.imageInfoJson.RepoTags[0];

    // (?<=\[).+?(?=\]) regex for command
    // let command = this.containerConfigJson.Cmd.toString();
    // command = command.match(/\[(.*?)\]/)[1].replace(/["]/g, '').replace(';', '');

    const dialogRef = this.dialog.open(ContainerCreateDialogComponent, {
      width: '400px',
      height: 'auto',
      // de inlocuit configjson cu valorile pentru parametrii ce se shcimba
      data: { containerName: '', configJson: this.containerConfigJson }
    });

    // change the sample data from above
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // de pus in containerConfigJson valorile din formular
        this.containerConfigJson = result.configJson;
        this.deploy(result.containerName);
        // console.log(result.configJson);
      }
    });
  }

  getImageInto(imageId: string) {
    this.imageInfoService.retrieveImageInfo(imageId)
      .subscribe(
        data => {
          this.imageInfoJson = data;

          this.containerConfigJson = this.imageInfoJson.ContainerConfig;

          this.containerConfigJson.Image = this.imageInfoJson.RepoTags[0];


          let repoTags: string;
          repoTags = JSON.stringify(data.RepoTags);
          this.name = repoTags.substr(2, repoTags.indexOf(':') - 2);
          this.tags = repoTags.substr(repoTags.indexOf(':') + 1)
            .replace(/["]/g, '')
            .replace(/[\]]/g, '');

          this.cmd = JSON.stringify(data.ContainerConfig.Cmd)
            .replace(/["]/g, '')
            .replace(/[[\]]/g, '')
            .replace(/[,]/g, ' ');

          this.volumes = JSON.stringify(data.ContainerConfig.Volumes)
            .replace(/[{}]/g, '')
            .replace(/["]/g, ' ')
            .replace(/[:]/g, '');

          this.environment = data.ContainerConfig.Env;
          this.workingDir = data.ContainerConfig.WorkingDir;

          this.exposedPorts = JSON.stringify(data.ContainerConfig.ExposedPorts)
            .replace(/[{}]/g, '')
            .replace(/["]/g, ' ')
            .replace(/[:]/g, '');
          this.author = data.Author;
          this.os = data.Os;
          this.architecture = data.Architecture;
          this.created = data.Created;

        }
      );
  }

  deploy(containerName: string) {

    this.appComponent.loading = true;
    this.appComponent.openSnackBar('Creating container...');

    this.imageInfoService.createContainer(this.containerConfigJson, containerName).subscribe(
      data => {
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Container created');
        this.router.navigateByUrl('/mycontainers');
      },
      error => {
        this.appComponent.loading = false;
      }
    );

    // console.log(this.containerConfigJson);


  }

}
