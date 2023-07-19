import { CartItem } from '../cart-item.model';

export class Order {
  constructor() {
    this.customer = new Customer();
    this.payment = new Payment();
    this.items = [];
    this.status = 'cart';
  }

  id = 0;
  customer: Customer;
  payment: Payment;
  items: CartItem[];
  Total = 0;
  status: orderstatus;
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
