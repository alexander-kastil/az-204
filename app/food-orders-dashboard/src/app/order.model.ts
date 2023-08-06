export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer: Customer;
  payment: Payment;
  items: OrderItem[];
  status: orderstatus;
}

export interface Payment {
  type: string;
  account: string;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  email: string;
}

export declare type orderstatus =
  | 'cart'
  | 'placed'
  | 'paid'
  | 'preparing'
  | 'ready_for_delivery'
  | 'delivered'
  | 'rejected';
