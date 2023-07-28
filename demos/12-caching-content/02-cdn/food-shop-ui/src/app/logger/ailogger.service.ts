import { Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AILoggerService implements OnDestroy {
  private routerSubscription!: Subscription;

  private static logger: ApplicationInsights;

  static getInstance(): ApplicationInsights {
    this.initAppInsights();
    return this.logger;
  }

  constructor() {
    AILoggerService.initAppInsights();
  }

  static loggingEnabled(): boolean {
    return (
      environment.azure.applicationInsights != '' &&
      environment.features.logging
    );
  }

  static initAppInsights() {
    if (AILoggerService.loggingEnabled()) {
      this.logger = new ApplicationInsights({
        config: {
          instrumentationKey: environment.azure.applicationInsights,
          enableAutoRouteTracking: true,
        },
      });
      this.logger.loadAppInsights();
      this.logger.trackEvent({ name: 'app instance started' });
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    if (AILoggerService.loggingEnabled()) {
      AILoggerService.logger.trackEvent({ name, properties });
    }
  }
}
