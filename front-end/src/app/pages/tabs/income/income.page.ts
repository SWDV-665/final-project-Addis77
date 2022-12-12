import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CommonService } from "../../services/common.service";
import { AddIncomeComponent } from "./add-income/add-income.component";
import { IncomeService } from "../../services/income.service";

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  Incomes: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private incomeService: IncomeService
  ) {
    this.getIncome();
  }

  ngOnInit() {
   }
   getIncome() {
    this.commonService.getLoader().then((loader:any) => {
      loader.present();
      this.incomeService.getAllIncomes().subscribe(
        (res: any) => {
          loader.dismiss();
          this.Incomes = res?.data;
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
      component: AddIncomeComponent,
      componentProps: { type: type, data: selected ? selected : "" },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === "confirm") {
      this.getIncome()
    }
  }
  deleteIncome(expense) {
    this.commonService
      .getConfirmAlert(
        "Delete Income",
        "Are you sure you want to delete this record?"
      )
      .then((alert) => {
        alert.present();
        alert.onDidDismiss().then((alertRes) => {
          if (alertRes.data.role === "positive") {
            this.incomeService.deleteIncome(expense).subscribe(
              (data) => {
                this.commonService
                  .getToast("Sucsess", 300, "Income deleted successfully")
                  .then((toast) => {
                    toast.present();
                  });
                  this.getIncome()
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
