import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'docker GUI';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  btnClick = function (path: String) {
    this.router.navigateByUrl('/' + path);
  };

}
