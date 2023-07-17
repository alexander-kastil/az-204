import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  http = inject(HttpClient);

  execCheckout() {
    let checkoutitem = {};
    return this.http.post(`${environment.checkoutApi}orders`, checkoutitem);
  }
}
