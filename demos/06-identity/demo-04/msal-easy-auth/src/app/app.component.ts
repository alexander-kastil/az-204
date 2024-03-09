import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EasyAuthService } from './entra-id/easy-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  easyAuth = inject(EasyAuthService);
  title = 'Angular and External Authentication (Easy Auth)';
  authenticated = signal(false);

  login() {
    this.easyAuth.authenticate().subscribe((user: any) => {
      console.log(user);
    });
  }
}
