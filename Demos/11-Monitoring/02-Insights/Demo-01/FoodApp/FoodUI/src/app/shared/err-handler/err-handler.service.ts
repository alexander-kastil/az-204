import { ErrorHandler, Injectable } from "@angular/core";
import { AppInsightsService } from "../app-insights/app-insights.service";

@Injectable({
  providedIn: "root",
})
export class ErrHandlerService extends ErrorHandler {
  constructor(private ai: AppInsightsService) {
    super();
  }

  handleError(error: Error) {
    this.ai.logException(error);
  }
}
