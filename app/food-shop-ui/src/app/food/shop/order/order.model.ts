import { CartItem } from '../cart-item.model';

export class Order {
  id = 0;
  customer: Customer = new Customer();
  payment: Payment = new Payment();
  items: CartItem[] = [];
  status: orderstatus = 'cart';
}

export class Payment {
  type = '';
  account = '';
}

export class Customer {
  id = '';
  name = '';
  address = '';
  email = '';
}

export declare type orderstatus =
  | 'cart'
  | 'placed'
  | 'paid'
  | 'preparing'
  | 'ready_for_delivery'
  | 'delivered'
  | 'rejected';
