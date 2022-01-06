import { forwardRef, Inject, Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Subscription } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class AppInsightsService implements OnDestroy {
  private routerSubscription!: Subscription;
  private appInsights!: ApplicationInsights;

  constructor(
    @Inject(forwardRef(() => ConfigService)) private cs: ConfigService
  ) {
    this.initAppInsights();
  }

  initAppInsights() {
    this.cs.cfgInit.subscribe((init) => {
      if (init) {
        this.appInsights = new ApplicationInsights({
          config: {
            instrumentationKey: this.cs.config.applicationInsights,
            enableAutoRouteTracking: true,
          },
        });
        this.appInsights.loadAppInsights();
      }
    });
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
