import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoodItem } from "./food.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ConfigService } from "../shared/config/config.service";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  constructor(private httpClient: HttpClient, private cs: ConfigService) {}

  getFood(): Observable<FoodItem[]> {
    return this.httpClient.get<FoodItem[]>(`${this.cs.api}food`);
  }
}
