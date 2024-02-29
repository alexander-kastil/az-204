import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodContainerComponent } from './catalog/catalog-container/food-container.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { FoodShopContainerComponent } from './shop/shop-container/food-shop-container.component';

const routes: Routes = [
  { path: '', component: FoodShopContainerComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'catalog', component: FoodContainerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodRoutingModule { }
