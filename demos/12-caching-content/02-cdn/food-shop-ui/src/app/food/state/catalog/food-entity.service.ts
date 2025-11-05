import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { CatalogItem } from '../../food-catalog.model';

@Injectable({
  providedIn: 'root',
})
export class FoodEntityService extends EntityCollectionServiceBase<CatalogItem> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Food', factory);
  }
}
