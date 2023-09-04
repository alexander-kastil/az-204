import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  http = inject(HttpClient)
  title = 'config-ui';
  apiUrl = environment.api;
  cfg: any;

  ngOnInit(): void {
    this.http.get(`${environment.api}/settings`).subscribe((settings) => {
      this.cfg = settings;
    });
  }
}
