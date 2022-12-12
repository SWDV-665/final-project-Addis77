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
  expenseForm:FormGroup;

  constructor(private modalCtrl: ModalController,private params: NavParams, private formBuilder : FormBuilder, private expenseService : ExpenseService) {
    this.expenseForm =  new FormGroup({
      id: new FormControl(""),
      date: new FormControl("", [Validators.required]),
      amount: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      detail: new FormControl("", Validators.required),
    });
    this.type = this.params.get('type');
    if(this.type == 'edit'){
      let data = this.params.get('data');
      this.patchValue(data);
    }
  }
ngOnInit(): void {

}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {   
    this.expenseService.postExpense(this.expenseForm.value).subscribe(res =>{
      console.log(res);
      return this.modalCtrl.dismiss(this.name, 'confirm');
    },error =>{
      console.log(error);
    })
  }
  patchValue(data){
    this.expenseForm = this.formBuilder.group({
      id: data.id,
      date: data.date,
      amount: data.amount,
      type: data.type,
      detail: data.detail,
    });
  }
}