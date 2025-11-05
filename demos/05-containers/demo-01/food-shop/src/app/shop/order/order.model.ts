import { CartItem } from '../cart-item.model';
export class Order {
  constructor() {
    this.customer = new Customer();
    this.payment = new Payment();
    this.shippingAddress = new Address();
    this.items = [];
  }

  id?: string;
  type = 'order'
  customer: Customer;
  shippingAddress: Address;
  payment: Payment;
  items: CartItem[];
  total = 0;
}

export class Payment {
  type = '';
  accountNumber = '';
}

export class Address {
  street = '';
  city = '';
  country = '';
  zipCode = '';
}

export class Customer {
  id = '';
  name = '';
  email = '';
  phone = '';
}