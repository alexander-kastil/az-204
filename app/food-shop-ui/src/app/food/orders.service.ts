import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  http = inject(HttpClient);

  checkout(order: any) {
    return this.http.post(`${environment.ordersApi}orders`, order);
  }
}
