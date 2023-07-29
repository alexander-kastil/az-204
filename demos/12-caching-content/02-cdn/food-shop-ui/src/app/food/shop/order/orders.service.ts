import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CartItem } from '../cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  http = inject(HttpClient);

  addToCart(item: CartItem) {

  }

  removeFromCart(item: CartItem) {

  }

  checkout(order: any) {
    return this.http.post(`${environment.ordersApi}orders`, order);
  }
}
