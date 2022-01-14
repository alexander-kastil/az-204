import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodContainerComponent } from './food-container/food-container.component';

const routes: Routes = [
  { path: '', component: FoodContainerComponent },
  { path: 'edit', component: FoodEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodRoutingModule {}
