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

import { UtilsModule } from '../extensions/utils.module';
import { MaterialModule } from '../material.module';
import { FoodContainerComponent } from './catalog/catalog-container/food-container.component';
import { FoodEditComponent } from './catalog/food-edit/food-edit.component';
import { FoodListComponent } from './catalog/food-list/food-list.component';
import { FoodRoutingModule } from './food-routing.module';
import { BorderDirective, BoxedDirective, ColumnDirective, RowDirective } from './formatting-directives';
import { CheckoutConfirmedComponent } from './shop/checkout/checkout-confirmed/checkout-confirmed.component';
import { CheckoutFormComponent } from './shop/checkout/checkout-form/checkout-form.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';
import { FoodShopContaienerComponent } from './shop/shop-container/food-shop-container.component';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { StatusComponent } from './shop/status/status.component';
import { cartEffects } from './state/cart/cart.effects';
import { cartFeature } from './state/cart/cart.state';
import { entityMetadata } from './state/catalog/entity-metadata';
import { FoodDataService } from './state/catalog/food-data.service';
import { FoodEntityService } from './state/catalog/food-entity.service';
import { CustomurlHttpGenerator } from './state/custom-url-generator';

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
    StoreModule.forFeature(cartFeature),
    EffectsModule.forFeature([cartEffects]),
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
