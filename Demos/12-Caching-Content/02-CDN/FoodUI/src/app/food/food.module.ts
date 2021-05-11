import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FoodContainerComponent } from "./food-container/food-container.component";
import { FoodListComponent } from "./food-list/food-list.component";
import { FoodEditComponent } from "./food-edit/food-edit.component";
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { foodFeatureKey, FoodReducer } from "./store/reducers/food.reducer";
import { EffectsModule } from "@ngrx/effects";
import { FoodEffects } from "./store/effects/food.effects";
import { FlexLayoutModule } from "@angular/flex-layout";

let comps = [FoodContainerComponent, FoodListComponent, FoodEditComponent];

@NgModule({
  declarations: comps,
  exports: comps,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forFeature(foodFeatureKey, FoodReducer),
    EffectsModule.forFeature([FoodEffects])
  ]
})
export class FoodModule {}
