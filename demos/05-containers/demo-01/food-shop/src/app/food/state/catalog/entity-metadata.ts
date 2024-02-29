import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { CatalogItem } from '../../catalog-item.model';

export function sortByName(a: CatalogItem, b: CatalogItem): number {
  let comp = a.name.localeCompare(b.name);
  return comp;
}

export const entityMetadata: EntityMetadataMap = {
  Food: {
    selectId: (food: CatalogItem) => food.id,
    sortComparer: sortByName,
  },
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};
