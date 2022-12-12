import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from '../../services/category.service';
import { CommonService } from '../../services/common.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  Categories: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private categoryService: CategoryService
  ) {
    this.getIncome();
  }

  ngOnInit() {
   }
   getIncome() {
    this.commonService.getLoader().then((loader:any) => {
      loader.present();
      this.categoryService.getAllCategorys().subscribe(
        (res: any) => {
          loader.dismiss();
          this.Categories = res?.data;
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
      component: AddCategoryComponent,
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
            this.categoryService.deleteCategory(expense).subscribe(
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

