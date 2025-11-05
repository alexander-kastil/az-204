import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AILoggerService } from 'src/app/shared/logger/ai-logger.service';
import { CatalogItem } from '../catalog-item.model';
import { CatalogListComponent } from '../catalog-list/catalog-list.component';
import { FoodEntityService } from '../state/food-entity.service';

@Component({
  selector: 'app-catalog-container',
  imports: [
    AsyncPipe,
    CatalogListComponent
  ],
  templateUrl: './catalog-container.component.html',
  styleUrl: './catalog-container.component.scss'
})
export class CatalogContainerComponent {
  router = inject(Router);
  service = inject(FoodEntityService);
  logger = inject(AILoggerService);
  food = this.service.entities$;

  ngOnInit() {
    this.service.loaded$.subscribe((loaded) => {
      if (!loaded) {
        this.service.getAll();
      }
    });
  }

  addFood() {
    this.router.navigate(['/catalog', 0]);
  }

  selectFood(f: CatalogItem) {
    this.router.navigate(['/catalog', f.id]);
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
