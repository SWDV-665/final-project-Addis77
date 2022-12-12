import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesPageRoutingModule } from './expenses-routing.module';

import { ExpensesPage } from './expenses.page';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseService } from '../../services/expense.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ExpensesPageRoutingModule
  ],
  declarations: [ExpensesPage,AddExpenseComponent],
  providers:[ExpenseService]
})
export class ExpensesPageModule {}
