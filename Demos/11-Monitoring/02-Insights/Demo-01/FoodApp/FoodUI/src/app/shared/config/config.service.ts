import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppInsightsService } from "../app-insights/app-insights.service";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private client: HttpClient, private ai: AppInsightsService) {}

  apiUrl: string = "https://localhost:5001/";

  init() {
    this.client
      .get("assets/app-config.json")
      .subscribe((val: { apiurl: string }) => {
        this.apiUrl = val.apiurl;
        this.ai.logEvent("FoodUI:API-URL", { url: val.apiurl });
      });
  }
}
