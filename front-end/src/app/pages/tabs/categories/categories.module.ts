import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { SharedModule } from 'src/app/component/shared/shared.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryService } from '../../services/category.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    CategoriesPageRoutingModule
  ],
  declarations: [CategoriesPage, AddCategoryComponent],
  providers:[CategoryService]
})
export class CategoriesPageModule {}
