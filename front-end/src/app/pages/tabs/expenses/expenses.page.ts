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
  ) {
    this.getExpenses();
  }

  ngOnInit() {
   }
  getExpenses() {
    this.commonService.getLoader().then((loader:any) => {
      loader.present();
      this.expenseService.getAllExpenses().subscribe(
        (res: any) => {
          loader.dismiss();
          this.expenses = res?.data;
        },
        (error) => {
          loader.dismiss();
          console.log(error);
        }
      );
    });
  }
  async openModal(type, selected) {
    const modal = await this.modalCtrl.create({
      component: AddExpenseComponent,
      componentProps: { type: type, data: selected ? selected : "" },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === "confirm") {
      this.getExpenses()
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
        alert.onDidDismiss().then((alertRes) => {
          if (alertRes.data.role === "positive") {
            this.expenseService.deleteExpense(expense).subscribe(
              (data) => {
                this.commonService
                  .getToast("Sucsess", 300, "Expense deleted successfully")
                  .then((toast) => {
                    toast.present();
                  });
                  this.getExpenses()
              },
              (error) => {
                console.log(error);
                this.commonService
                  .getToast("Error", 300, "Error")
                  .then((toast) => {
                    toast.present();
                  });
              }
            );
          } else {
            this.commonService.getToast("Error", 300, "Error").then((toast) => {
              toast.present();
            });
          }
        });
      });
  }
}
