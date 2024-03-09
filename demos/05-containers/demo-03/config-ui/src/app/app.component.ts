import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [JsonPipe]
})
export class AppComponent {
  http = inject(HttpClient);
  title = 'ng-config-env';
  apiUrl = environment.apiUrl;
  cfg: any;

  ngOnInit(): void {
    this.http.get(this.apiUrl + '/settings').subscribe((settings) => {
      this.cfg = settings;
    });
  }
}
