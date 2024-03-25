import { registerLocaleData } from '@angular/common';
import localeAT from '@angular/common/locales/de-AT';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localeAT);

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
