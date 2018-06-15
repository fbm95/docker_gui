import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ImagesComponent} from './images/images.component';
import {ContainersComponent} from './containers/containers.component';
import {SettingsComponent} from './settings/settings.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {ImageInfoComponent} from './image-info/image-info.component';
import {ContainerInfoComponent} from './container-info/container-info.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'home',
    // pathMatch: 'full'
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'mycontainers',
    component: ContainersComponent
  },
  {
    path: 'container/:id',
    component: ContainerInfoComponent
  },
  {
    path: 'myimages',
    component: ImagesComponent
  },
  {
    path: 'image/:id',
    component: ImageInfoComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
