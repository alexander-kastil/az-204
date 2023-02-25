import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { environment } from 'src/environments/environment';
import { FoodItem } from "../../food-item.model";

@Injectable()
export class FoodDataService extends DefaultDataService<FoodItem> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Food', http, httpUrlGenerator);
  }

  // .NET App PUT has a different signature than the default
  // PUT http://localhost:PORT/food
  override update(skill: Update<FoodItem>) {
    return this.http.put<FoodItem>(`${environment.api}food`, {
      ...skill.changes,
    });
  }
}
