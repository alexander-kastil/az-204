import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  clearStorage() {
    localStorage.clear();
    return of(true);
  }

  loadFromStorage() {
    const cart = localStorage.getItem('cart') as CartItem[] | null;
    return of(cart);
  }

  saveToStorage(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    return of(true);
  }
}
