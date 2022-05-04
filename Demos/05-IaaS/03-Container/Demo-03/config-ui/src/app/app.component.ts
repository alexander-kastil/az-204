import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-config-env';
  apiUrl = environment.apiUrl;
  cfg: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl + '/settings').subscribe((settings) => {
      this.cfg = settings;
    });
  }
}
