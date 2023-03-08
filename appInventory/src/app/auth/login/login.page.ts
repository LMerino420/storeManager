import { Component, OnInit } from '@angular/core';
import { Commons } from '../../commons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any;
  password: any;

  constructor(private commons: Commons) {}

  ngOnInit() {}

  goBack() {
    this.commons.goTo('');
  }
}
