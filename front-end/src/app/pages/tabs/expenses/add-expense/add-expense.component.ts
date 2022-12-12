import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ExpenseService } from 'src/app/pages/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  name: string;
  date:any;
  type='';
  expenseId:any;
  expenseForm:FormGroup;
  Categories:any[]= [];
  constructor(private modalCtrl: ModalController,private params: NavParams, private formBuilder : FormBuilder, private expenseService : ExpenseService) {
    this.getCategories();
    this.expenseForm =  new FormGroup({
      date: new FormControl("", [Validators.required]),
      time: new FormControl("", [Validators.required]),
      amount: new FormControl("", Validators.required),
      category_id: new FormControl("", Validators.required),
      detail: new FormControl("", Validators.required),
    });
    this.type = this.params.get('type');
    if(this.type == 'edit'){
      let data = this.params.get('data');
      this.expenseId = data._id
      this.patchValue(data);
    }
  }
ngOnInit(): void {

}
getCategories(){
  this.expenseService.getExpensesCategories().subscribe((categories:any) =>{
this.Categories = categories.data;
console.log(this.Categories)
  },error =>{
console.log(error);
  })
}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {   
    if(this.type == 'edit'){
      this.expenseService.putExpense(this.expenseForm.value,this.expenseId).subscribe(res =>{
        console.log(res);
        return this.modalCtrl.dismiss(this.name, 'confirm');
      },error =>{
        console.log(error);
      })
    }else{
      this.expenseService.postExpense(this.expenseForm.value).subscribe(res =>{
        console.log(res);
        return this.modalCtrl.dismiss(this.name, 'confirm');
      },error =>{
        console.log(error);
      })
    }
  }
  patchValue(data){
    this.expenseForm = this.formBuilder.group({
      date: data.date,
      time: data.time,
      amount: data.amount,
      category_id: data.category._id,
      detail: data.detail,
    });
  }
}