import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsService} from './settings.service';
import {MatHorizontalStepper, MatStepper} from '@angular/material';


export interface Element {
  name: string;
  position: number;
  value: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ SettingsService ],
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit  {
  // stepper
  @ViewChild  ('stepper') stepper;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ip: string;
  port: string;

  // http client
  error: any;
  headers: string[];

  // table
  displayedColumns = ['position', 'name', 'value'];
  dataSource: Element[];

  constructor(private _formBuilder: FormBuilder, private settingsService: SettingsService) {}


  ngOnInit() {
    this.ip = localStorage.getItem('dockerIp');
    this.port = localStorage.getItem('dockerPort');

    if (this.ip && this.port) {
      this.isLinear = false;
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: [this.ip, Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: [this.port, Validators.required]
      });

      this.connect();
      this.stepper._selectedIndex = 2;

    } else {

      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }
  }

  connect() {
    this.settingsService.ip = this.ip;
    this.settingsService.port = this.port;
    this.clear();
    this.showVersion();
  }

  showVersion() {
    this.settingsService.getVersion()
      .subscribe(
        data => this.dataSource = [
          {position: 1, name: 'Connected to', value: 'http://' + this.ip + ':' + this.port},
          {position: 2, name: 'Version', value: data['Version']},
          {position: 3, name: 'ApiVersion', value: data['ApiVersion']},
          {position: 4, name: 'GitCommit', value: data['GitCommit']},
          {position: 5, name: 'GoVersion', value: data['GoVersion']},
          {position: 6, name: 'Os', value: data['Os']},
          {position: 7, name: 'Arch', value: data['Arch']},
          {position: 8, name: 'KernelVersion', value: data['KernelVersion']},
          {position: 9, name: 'BuildTime', value: data['BuildTime']}
          ],
        error => this.error = error,
      () => {
          localStorage.setItem('dockerIp', this.ip);
          localStorage.setItem('dockerPort', this.port);
        });
  }

  clear() {
    this.dataSource = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  reset() {
    this.clear();
    this.settingsService.ip = this.ip;
    this.settingsService.port = this.port;
    localStorage.removeItem('dockerIp');
    localStorage.removeItem('dockerPort');
  }

}
