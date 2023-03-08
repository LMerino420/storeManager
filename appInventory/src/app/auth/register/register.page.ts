import { Component, OnInit } from '@angular/core';
import { Commons } from '../../commons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: any;
  email: any;
  user: any;
  password: any;

  constructor(private commons: Commons) {}

  ngOnInit() {}

  goBack() {
    this.commons.goTo('');
  }
}
