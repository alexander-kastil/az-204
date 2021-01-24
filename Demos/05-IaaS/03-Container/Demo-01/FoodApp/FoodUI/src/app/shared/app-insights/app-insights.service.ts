import { Injectable, OnDestroy } from "@angular/core";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ActivatedRouteSnapshot, ResolveEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AppInsightsService implements OnDestroy {
  constructor(private router: Router) {
    this.appInsights.loadAppInsights();
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe((event: ResolveEnd) => {
        const activatedComponent = this.getActivatedComponent(event.state.root);
        if (activatedComponent) {
          this.logPageView(
            `${activatedComponent.name} ${this.getRouteTemplate(
              event.state.root
            )}`,
            event.urlAfterRedirects
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  private routerSubscription: Subscription;

  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: environment.appInsights.instrumentationKey,
      autoTrackPageVisitTime: true,
    },
  });

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }
    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = "";
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }
    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }
    return path;
  }

  logEvent(name: string, data: any) {
    this.appInsights.trackEvent({ name, properties: data });
    this.appInsights.stopTrackEvent(name);
    this.appInsights.flush();
  }
}
