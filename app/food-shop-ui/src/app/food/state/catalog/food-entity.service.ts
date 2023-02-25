import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { FoodItem } from "../../food-item.model";

@Injectable({
  providedIn: 'root',
})
export class FoodEntityService extends EntityCollectionServiceBase<FoodItem> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Food', factory);
  }
}
