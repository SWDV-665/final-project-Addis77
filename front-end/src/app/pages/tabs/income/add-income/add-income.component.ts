import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ExpenseService } from 'src/app/pages/services/expense.service';
import { IncomeService } from 'src/app/pages/services/income.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
})
export class AddIncomeComponent implements OnInit {
  name: string;
  date:any;
  type='';
  expenseId:any;
  IncomeForm:FormGroup;
  Categories:any[]= [];
  constructor(private modalCtrl: ModalController,private params: NavParams, private formBuilder : FormBuilder, private incomeService : IncomeService) {
    this.IncomeForm =  new FormGroup({
      amount: new FormControl("", Validators.required),
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
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {   
    if(this.type == 'edit'){
      this.incomeService.putIncome(this.IncomeForm.value,this.expenseId).subscribe(res =>{
        console.log(res);
        return this.modalCtrl.dismiss(this.name, 'confirm');
      },error =>{
        console.log(error);
      })
    }else{
      this.incomeService.postIncome(this.IncomeForm.value).subscribe(res =>{
        console.log(res);
        return this.modalCtrl.dismiss(this.name, 'confirm');
      },error =>{
        console.log(error);
      })
    }
  }
  patchValue(data){
    this.IncomeForm = this.formBuilder.group({
      amount: data.amount,
      detail: data.detail,
    });
  }
}
