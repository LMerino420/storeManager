import { Component, OnInit } from '@angular/core';
import { Commons } from '../../commons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(private commons: Commons) {}

  ngOnInit() {}

  goTo(direction: string) {
    this.commons.goTo(direction);
  }
}
