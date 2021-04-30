import { Component } from "@angular/core";
import { AppInsightsService } from "./shared/app-insights/app-insights.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private appInsights: AppInsightsService) {}

  title = "Passion for Food!";
}
