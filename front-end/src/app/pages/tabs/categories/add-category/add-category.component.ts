import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/pages/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  name: string;
  date:any;
  type='';
  categoryId:any;
  categoryForm:FormGroup;
  Categories:any[]= [];
  constructor(private modalCtrl: ModalController,private params: NavParams, private formBuilder : FormBuilder, private categoryService : CategoryService) {
    this.categoryForm =  new FormGroup({
      name: new FormControl("", Validators.required),
    });
    this.type = this.params.get('type');
    if(this.type == 'edit'){
      let data = this.params.get('data');
      this.categoryId = data._id
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
      this.categoryService.putCategory(this.categoryForm.value,this.categoryId).subscribe(res =>{
        console.log(res);
        return this.modalCtrl.dismiss(this.name, 'confirm');
      },error =>{
        console.log(error);
      })
    }else{
      this.categoryService.postCategory(this.categoryForm.value).subscribe(res =>{
        console.log(res);
        return this.modalCtrl.dismiss(this.name, 'confirm');
      },error =>{
        console.log(error);
      })
    }
  }
  patchValue(data){
    this.categoryForm = this.formBuilder.group({
      name: data.name,
    });
  }
}
