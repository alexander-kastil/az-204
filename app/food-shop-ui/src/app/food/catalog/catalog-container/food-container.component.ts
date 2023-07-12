import { Component, OnInit } from '@angular/core';
import { CatalogItem } from '../../food-catalog.model';
import { FoodEntityService } from '../../state/catalog/food-entity.service';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
})
export class FoodContainerComponent implements OnInit {
  food = this.foodService.entities$;
  selected: CatalogItem | null = null;

  constructor(private foodService: FoodEntityService) {}

  ngOnInit() {
    this.foodService.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.foodService.getAll();
      }
    });
  }

  addFood(item: CatalogItem) {
    this.selected = item;
  }

  selectFood(f: CatalogItem) {
    this.selected = { ...f };
  }

  deleteFood(f: CatalogItem) {
    this.foodService.delete(f.id);
  }

  foodSaved(f: CatalogItem) {
    if (f.id == 0) {
      this.foodService.add(f);
    } else {
      this.foodService.update(f);
    }
  }
}
