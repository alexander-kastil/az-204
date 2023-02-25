import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { FoodItem } from "../../food-item.model";

export function sortByName(a: FoodItem, b: FoodItem): number {
  let comp = a.name.localeCompare(b.name);
  return comp;
}

export const entityMetadata: EntityMetadataMap = {
  Food: {
    selectId: (food: FoodItem) => food.id,
    sortComparer: sortByName,
  },
};

// export const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  // pluralNames,
};
