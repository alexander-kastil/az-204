import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodItem } from './food.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private api: string = '';

  constructor(private httpClient: HttpClient) {
    this.api = environment.apiUrl;
  }

  getFood() {
    return this.httpClient.get<FoodItem[]>(`${this.api}food`);
  }

  deleteFood(id: number) {
    return this.httpClient.delete<FoodItem>(`${this.api}food/${id}`);
  }

  addFood(food: FoodItem) {
    return this.httpClient.post<FoodItem>(`${this.api}food`, food);
  }

  updateFood(food: FoodItem) {
    return this.httpClient.put<FoodItem>(`${this.api}food/${food.id}`, food);
  }
}
