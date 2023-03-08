import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../../services/home.service';
import { Commons } from '../../../commons';

@Component({
  selector: 'app-expenses-detail',
  templateUrl: './expenses-detail.page.html',
  styleUrls: ['./expenses-detail.page.scss'],
})
export class ExpensesDetailPage implements OnInit {
  expensesDetail: any = [];

  constructor(private homeService: HomeService, private commons: Commons) {}

  async ngOnInit() {
    await this.getExpensesDetail();
  }

  //* REDIRECCIONAR A HOME
  goHome() {
    this.commons.goTo('home');
  }

  //* OBTENER DETALLE DE LOS GASTOS
  async getExpensesDetail() {
    await this.commons.showLoader('Getting expense detail');
    const data = await this.homeService.getExpensesDetail();
    data.subscribe(async (dt: any) => {
      await this.commons.hideLoader();
      const code = dt.code;
      if (code === 'SUCCESS') {
        const obj = dt.object;
        this.expensesDetail = obj;
      } else {
        await this.commons.errorAlert();
      }
    });
  }
}
