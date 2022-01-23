import { Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppInsightsService implements OnDestroy {
  private routerSubscription!: Subscription;
  private appInsights!: ApplicationInsights;

  constructor() {
    this.initAppInsights();
  }

  initAppInsights() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.azure.applicationInsights,
        enableAutoRouteTracking: true,
      },
    });
    this.appInsights.loadAppInsights();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({ name: name }, properties);
  }

  logMetric(
    name: string,
    average: number,
    properties?: { [key: string]: any }
  ) {
    this.appInsights.trackMetric({ name: name, average: average }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({
      exception: exception,
      severityLevel: severityLevel,
    });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    this.appInsights.trackTrace({ message: message }, properties);
  }
}
