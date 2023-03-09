import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductPage } from '../add-product/add-product.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'add-product/:id ',
    component:AddProductPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
