import { Component } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

// ng g component results --module=app.module.ts
// ng serve --proxy-config proxy.conf.json

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    const prop = new MatSnackBarConfig();
    prop.duration = 3000;
    this.snackBar.open(message, 'X', prop);
  }

}
