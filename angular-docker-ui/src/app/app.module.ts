import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {AppComponent} from './app.component';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ContainersComponent } from './containers/containers.component';
import { ImagesComponent } from './images/images.component';
import { SettingsComponent } from './settings/settings.component';
import {AppRoutingModule} from './routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ImagesService} from './images/images.service';
import {SettingsService} from './settings/settings.service';
import {ContainersService} from './containers/containers.service';
import { ImageInfoComponent } from './image-info/image-info.component';
import {ImageInfoService} from './image-info/image-info.service';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ContainerInfoComponent } from './container-info/container-info.component';
import {ContainerInfoService} from './container-info/container-info.service';
import { ContainerCreateDialogComponent } from './container-create-dialog/container-create-dialog.component';
import {HomeService} from './home/home.service';
import {FileSizePipe} from './pipes/filesize.pipe';
import {NgPipesModule} from 'ngx-pipes';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContainersComponent,
    ImagesComponent,
    SettingsComponent,
    PagenotfoundComponent,
    ImageInfoComponent,
    TimeAgoPipe,
    ContainerInfoComponent,
    ContainerCreateDialogComponent,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgPipesModule
  ],
  providers: [
    ImagesService,
    SettingsService,
    ContainersService,
    ImageInfoService,
    ContainerInfoService,
    HeaderComponent,
    HomeService
  ],
  exports: [ FileSizePipe ],
  entryComponents: [ContainerCreateDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
