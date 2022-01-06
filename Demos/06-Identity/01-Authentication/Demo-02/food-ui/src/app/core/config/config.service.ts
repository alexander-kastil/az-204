import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config.model';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: AppConfig;
  cfgInit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {
    this.initConfig();
  }

  initConfig() {
    this.client.get<AppConfig>('assets/app-config.json').subscribe((cfg) => {
      this.config = cfg;
      console.log('config:', this.config);
      this.cfgInit.next(true);
    });
  }

  //app module statics
  static appInitFactory(configsrv: ConfigService) {
    return () => configsrv;
  }
}
