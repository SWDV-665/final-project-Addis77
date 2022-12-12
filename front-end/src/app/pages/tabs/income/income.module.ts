import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomePageRoutingModule } from './income-routing.module';

import { IncomePage } from './income.page';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { AddIncomeComponent } from './add-income/add-income.component';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from '../../services/income.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    IncomePageRoutingModule
  ],
  declarations: [IncomePage, AddIncomeComponent],
  providers:[IncomeService]
})
export class IncomePageModule {}
