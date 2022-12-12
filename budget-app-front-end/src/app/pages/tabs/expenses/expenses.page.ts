import { ExpenseService } from "./../../services/expense.service";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CommonService } from "../../services/common.service";
import { AddExpenseComponent } from "./add-expense/add-expense.component";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.page.html",
  styleUrls: ["./expenses.page.scss"],
})
export class ExpensesPage implements OnInit {
  expenses: any[] = [];
  message: any;
  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.expenses = [
      {
        id: 1,
        detail: "Expense for Groceries",
        type: "apple",
        date: "2022-05-22",
        amount: 5000,
      },
      {
        id: 2,
        detail: "Fuel Expense",
        type: "oranges",
        date: "2022-03-02",
        amount: 7000,
      },
      {
        id: 3,
        detail: "Rent Expense",
        type: "oranges",
        date: "2022-07-28",
        amount: 3250,
      },
      {
        id: 4,
        detail: "loan",
        type: "apple",
        date: "2022-01-09",
        amount: 1000,
      },
      {
        id: 5,
        detail: "Pay to house Owner",
        type: "bananas",
        date: "2022-04-13",
        amount: 800,
      },
    ];
  }
  async openModal(type, selected) {
    const modal = await this.modalCtrl.create({
      component: AddExpenseComponent,
      componentProps: { type: type, data: selected ? selected : "" },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === "confirm") {
      this.message = `Hello, ${data}!`;
    }
  }
  deleteExpense(expense) {
    this.commonService
      .getConfirmAlert(
        "Delete Expense",
        "Are you sure you want to delete this record?"
      )
      .then((alert) => {
        alert.present();
        alert.onDidDismiss().then((alertRes) =>{
          if (alertRes.data.role === "positive") {
            this.expenseService.deleteExpense(expense).subscribe((data) => {
              console.log(data);
              this.commonService.getToast('Sucsess',300,'Expense deleted successfully').then(toast =>{
                toast.present();
              })
            },error =>{
              console.log(error);
              this.commonService.getToast('Error',300,'Error').then(toast =>{
                toast.present();
              })
            });
          }else{
            this.commonService.getToast('Error',300,'Error').then(toast =>{
              toast.present();
            })
          }
        })
      });
  }
}
