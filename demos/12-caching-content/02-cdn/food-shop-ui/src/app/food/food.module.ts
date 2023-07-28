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

import { MaterialModule } from '../material.module';
import { UtilsModule } from '../extensions/utils.module';
import { FoodContainerComponent } from './catalog/catalog-container/food-container.component';
import { FoodEditComponent } from './catalog/food-edit/food-edit.component';
import { FoodListComponent } from './catalog/food-list/food-list.component';
import { FoodRoutingModule } from './food-routing.module';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { FoodShopContaienerComponent } from './shop/shop-container/food-shop-container.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { CartEffects } from './state/cart/cart.effects';
import { cartFeatureKey, cartReducer } from './state/cart/cart.reducer';
import { entityMetadata } from './state/catalog/entity-metadata';
import { FoodDataService } from './state/catalog/food-data.service';
import { CustomurlHttpGenerator } from './state/custom-url-generator';
import { StatusComponent } from './shop/status/status.component';
import { FoodEntityService } from './state/catalog/food-entity.service';
import { CheckoutFormComponent } from './shop/checkout/checkout-form/checkout-form.component';
import { CheckoutConfirmedComponent } from './shop/checkout/checkout-confirmed/checkout-confirmed.component';
import { BorderDirective, BoxedDirective, ColumnDirective, RowDirective } from './formatting-directives';

@NgModule({
  declarations: [
    FoodContainerComponent,
    FoodListComponent,
    FoodEditComponent,
    FoodShopContaienerComponent,
    ShopItemComponent,
    CheckoutComponent,
    StatusComponent,
    CheckoutFormComponent,
    CheckoutConfirmedComponent,
  ],

  imports: [
    CommonModule,
    FoodRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    UtilsModule,
    ColumnDirective,
    RowDirective,
    BoxedDirective,
    BorderDirective,
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  providers: [
    {
      provide: HttpUrlGenerator,
      useClass: CustomurlHttpGenerator,
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
