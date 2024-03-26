import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { environment } from 'src/environments/environment';
import { CatalogItem } from '../catalog-item.model';

@Injectable({
  providedIn: 'root',
})
export class FoodDataService extends DefaultDataService<CatalogItem> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Food', http, httpUrlGenerator);
  }

  // PUT http://localhost:PORT/food
  override update(skill: Update<CatalogItem>) {
    return this.http.put<CatalogItem>(`${environment.catalogApi}food`, {
      ...skill.changes,
    });
  }
}
