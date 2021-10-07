import { Component } from "@angular/core";
import { AppInsightsService } from "./shared/app-insights/app-insights.service";
import { AuthFacade } from "./auth/store/facades/auth.facade";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private appInsights: AppInsightsService, private af: AuthFacade) {
    this.appInsights.logEvent("FoodUI loaded");
  }

  title = "Passion for Food!";
  displayAuth$ = this.af.displayAuth();
}
