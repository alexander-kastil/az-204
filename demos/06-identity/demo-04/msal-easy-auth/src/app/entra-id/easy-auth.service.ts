import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EasyAuthService {
  http = inject(HttpClient);

  authenticate(): Observable<any> {
    return this.http.get('/.auth/me');
  }
}
