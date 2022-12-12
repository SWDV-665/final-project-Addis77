import { AfterContentChecked, Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {

  accounts: any[] = [];
  bannerConfig: SwiperOptions;
  transactions: any[] = [];

  constructor() { }

  ngOnInit() {
    this.accounts = [
      { id: 1, acc_no: '57868945098', balance: '200000' }
    ];
    this.transactions = [
      { id: 1, to: 'Apple Expense', date: '2022-05-22', amount: 5000 },
      { id: 2, to: 'Bill Expense', date: '2022-03-02', amount: 7000 },
      { id: 3, to: 'Gass Bill Payment', date: '2022-07-28', amount: 3250 },
      { id: 4, to: 'Car rent', date: '2022-01-09', amount: 1000 },
      { id: 5, to: 'Salary Income', date: '2022-04-13', amount: -800 },
    ];
  }

  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1,
      pagination: { clickable: true }
    };
  }

}
