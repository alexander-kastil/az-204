import { Component, OnInit, inject } from '@angular/core';
import { CatalogItem } from '../../catalog-item.model';
import { FoodEntityService } from '../../state/catalog/food-entity.service';
import { FoodEditComponent } from '../food-edit/food-edit.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { FoodListComponent } from '../food-list/food-list.component';
import { AILoggerService } from '../../../logger/ai-logger.service';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
  standalone: true,
  imports: [
    FoodListComponent,
    NgIf,
    FoodEditComponent,
    AsyncPipe,
  ],
})
export class FoodContainerComponent implements OnInit {
  foodES = inject(FoodEntityService);
  logger = inject(AILoggerService);
  food = this.foodES.entities$;
  selected: CatalogItem | null = null;

  ngOnInit() {
    this.foodES.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.foodES.getAll();
        this.logger.logEvent('loaded data food from catalog');
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
