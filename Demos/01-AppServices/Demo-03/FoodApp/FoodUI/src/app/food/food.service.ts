import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoodItem } from "./food.model";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "../shared/config/config.service";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  constructor(private httpClient: HttpClient, private cs: ConfigService) {}

  getFood(): Observable<FoodItem[]> {
    return this.httpClient.get<FoodItem[]>(`${this.cs.apiUrl}food`);
  }

  mailFood(item: FoodItem) {
    return this.httpClient.post<FoodItem>(`${this.cs.apiUrl}mail`, item);
  }

  deleteFood(item: FoodItem) {
    return this.httpClient.delete<FoodItem>(`${this.cs.apiUrl}food/${item.id}`);
  }

  saveFood(item: FoodItem): Observable<FoodItem> {
    return this.httpClient.post<FoodItem>(`${this.cs.apiUrl}food`, item);
  }
}
