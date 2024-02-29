import { Injectable, OnDestroy } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AILoggerService implements OnDestroy {
  private routerSubscription!: Subscription;
  private static logger: ApplicationInsights;

  constructor() {
    AILoggerService.initAppInsights();
  }

  static getInstance(): ApplicationInsights {
    this.initAppInsights();
    return this.logger;
  }

  static loggingEnabled(): boolean {
    return true;
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
      this.logger.addTelemetryInitializer((envelope) => {
        let itemTags = envelope.tags;
        if (itemTags) {
          itemTags = itemTags || [];
          itemTags['ai.cloud.role'] = environment.title;
        }
        this.logger.trackEvent({ name: `${environment.title} - app started` });
      }
      );
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    if (AILoggerService.loggingEnabled()) {
      var label = `${environment.title} - ${name}`;
      console.log(label, properties);
      AILoggerService.logger.trackEvent({ name: label, properties });
    }
  }

  logEventObject(name: string, item: any) {
    if (AILoggerService.loggingEnabled()) {
      var label = `${environment.title} - ${name}`;
      var json = JSON.stringify(item);
      console.log(label, item);
      AILoggerService.logger.trackEvent({ name: label, properties: { json } });
    }
  }
}
