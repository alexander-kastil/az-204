import { Component, OnInit, inject } from '@angular/core';
import { CatalogItem } from '../../food-catalog.model';
import { FoodEntityService } from '../../state/catalog/food-entity.service';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
})
export class FoodContainerComponent implements OnInit {
  foodES = inject(FoodEntityService);
  food = this.foodES.entities$;
  selected: CatalogItem | null = null;

  ngOnInit() {
    this.foodES.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.foodES.getAll();
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
    this.foodES.delete(f.id);
  }

  foodSaved(f: CatalogItem) {
    if (f.id == 0) {
      this.foodES.add(f);
    } else {
      this.foodES.update(f);
    }
  }
}
