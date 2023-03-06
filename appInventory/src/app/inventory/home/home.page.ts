import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../../services/home.service';
import { Commons } from '../../commons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  expenses: any;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private commons: Commons
  ) {}

  async ngOnInit() {
    await this.getExpenses();
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  async getExpenses() {
    await this.commons.showLoader('Getting expenses');
    const data = await this.homeService.getExpenses();
    data.subscribe(async (dt: any) => {
      await this.commons.hideLoader();
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object;
        this.expenses = obj.expenses;
      } else {
        this.expenses = 0.0;
        await this.commons.errorAlert();
      }
    });
  }
}
