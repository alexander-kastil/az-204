import { CartItem } from '../cart-item.model';

export class Order {
  customer = '';
  email = '';
  payment = '';
  address = '';
  items: CartItem[] = [];
}
