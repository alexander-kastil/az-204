import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  EntityDataService,
  EntityDefinitionService,
  HttpUrlGenerator,
} from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FoodContainerComponent } from './catalog/catalog-container/food-container.component';
import { FoodEditComponent } from './catalog/food-edit/food-edit.component';
import { FoodListComponent } from './catalog/food-list/food-list.component';
import { FoodRoutingModule } from './food-routing.module';
import { BorderDirective, BoxedDirective, ColumnDirective, RowDirective } from './formatting-directives';
import { CheckoutFormComponent } from './shop/checkout/checkout-form/checkout-form.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { FoodShopContainerComponent } from './shop/shop-container/food-shop-container.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { StatusComponent } from './shop/status/status.component';
import { cartEffects } from './state/cart/cart.effects';
import { cartFeature } from './state/cart/cart.state';
import { entityMetadata } from './state/catalog/entity-metadata';
import { FoodDataService } from './state/catalog/food-data.service';
import { FoodEntityService } from './state/catalog/food-entity.service';
import { CustomUrlHttpGenerator } from './state/custom-url-generator';

@NgModule({
  imports: [
    CommonModule,
    FoodRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ColumnDirective,
    RowDirective,
    BoxedDirective,
    BorderDirective,
    StoreModule.forFeature(cartFeature),
    EffectsModule.forFeature([cartEffects]),
    FoodContainerComponent,
    FoodListComponent,
    FoodEditComponent,
    FoodShopContainerComponent,
    ShopItemComponent,
    CheckoutComponent,
    StatusComponent,
    CheckoutFormComponent,
  ],
  providers: [
    {
      provide: HttpUrlGenerator,
      useClass: CustomUrlHttpGenerator,
    },
    FoodEntityService,
    FoodDataService,
  ],
})
export class FoodModule {
  constructor(
    entityDefinitionService: EntityDefinitionService,
    entityDataService: EntityDataService,
    foodDataService: FoodDataService
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Food', foodDataService);
  }
}
