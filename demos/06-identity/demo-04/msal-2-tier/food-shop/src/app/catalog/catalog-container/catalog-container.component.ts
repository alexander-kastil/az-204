import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AILoggerService } from 'src/app/shared/logger/ai-logger.service';
import { CatalogItem } from '../catalog-item.model';
import { FoodEntityService } from '../state/food-entity.service';
import { CatalogListComponent } from '../catalog-list/catalog-list.component';
import { CatalogEditComponent } from '../catalog-edit/catalog-edit.component';

@Component({
  selector: 'app-catalog-container',
  standalone: true,
  imports: [
    CatalogListComponent,
    CatalogEditComponent,
    AsyncPipe
  ],
  templateUrl: './catalog-container.component.html',
  styleUrl: './catalog-container.component.scss'
})
export class CatalogContainerComponent {
  service = inject(FoodEntityService);
  logger = inject(AILoggerService);
  food = this.service.entities$;
  selected: CatalogItem | null = null;

  ngOnInit() {
    this.service.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.service.getAll();
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
    this.service.delete(f.id);
  }

  foodSaved(f: CatalogItem) {
    if (f.id == 0) {
      this.service.add(f);
    } else {
      this.service.update(f);
    }
  }
}
