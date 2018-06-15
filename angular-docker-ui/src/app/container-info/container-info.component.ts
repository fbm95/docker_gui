import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContainerInfoService} from './container-info.service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-container-info',
  templateUrl: './container-info.component.html',
  styleUrls: ['./container-info.component.css']
})
export class ContainerInfoComponent implements OnInit {

  name: string;
  id: string;
  status: string;
  image: string;

  portMapping: string;
  containerIp: string;
  links: string;
  volume: string;
  command: string;
  arguments: string;
  environment: string;


  constructor(private containerInfoService: ContainerInfoService, private router: Router, public appComponent: AppComponent) { }

  ngOnInit() {
    const url = this.router.url;
    this.id = url.substr(11, 12);
    this.getContainerInto(this.id);
  }

  getContainerInto(containerId: string) {
    this.containerInfoService.retrieveContainerInfo(containerId)
      .subscribe(
        data => {
          this.name = data.Name;
          this.status = data.State.Status;
          this.image = data.Config.Image;

          this.portMapping = JSON.stringify(data.Config.ExposedPorts)
            .replace(/[{}]/g, '')
            .replace(/["]/g, ' ')
            .replace(/[:]/g, '');
          if (data.NetworkSettings.Networks.IPAddress != null && data.NetworkSettings.Networks.IPAddress !== '') {
            this.containerIp = data.NetworkSettings.Networks.IPAddress;
          } else {
            this.containerIp = 'not configured';
          }
          if (data.HostConfig.Links != null && data.HostConfig.Links !== '') {
            this.links = data.HostConfig.Links;
          } else {
            this.links = 'not configured';
          }
          if (data.Config.Volumes != null && data.Config.Volumes !== '') {
            this.volume = JSON.stringify(data.Config.Volumes).replace(',', ' , ');
          } else {
            this.volume = 'not configured';
          }
          // this.volume = this.volume.substr(1, this.volume.length - 2);

          this.command = data.Config.Cmd;
          this.arguments = data.Args;
          this.environment = data.Config.Env;

        },
        error => {
          this.router.navigateByUrl('/home');
          this.appComponent.openSnackBar('Container is part of a swarm');
          // console.log('container is part of a swarm');
        }
      );
  }

  startContainer(id: string) {
    this.appComponent.loading = true;
    this.appComponent.openSnackBar('Starting container...');

    this.containerInfoService.startContainer(id).subscribe(
      data => {
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Container started');
        this.router.navigateByUrl('/mycontainers');
      },
      error => {
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Container already started');
      }
    );
  }

  stopContainer(id: string) {
    this.appComponent.loading = true;
    this.appComponent.openSnackBar('Stopping container...');

    this.containerInfoService.stopContainer(id).subscribe(
      data => {
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Container stopped');
        this.router.navigateByUrl('/mycontainers');
      },
      error => {
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Container already stopped');
      }
    );

  }

  removeContainer(id: string) {
    this.appComponent.loading = true;
    this.appComponent.openSnackBar('Removing container...');

    this.containerInfoService.removeContainer(id).subscribe(
      data => {
        this.appComponent.loading = false;
        this.appComponent.openSnackBar('Container removed');
        this.router.navigateByUrl('/mycontainers');
      },
      error => {
        this.appComponent.loading = false;
      }
    );
  }
}
