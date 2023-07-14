export interface OrderItem {
  name: string;
  quantity: number;
}

export interface FoodOrder {
  id: string;
  customerId: string;
  customerName: string;
  address: string;
  items: OrderItem[];
  status: orderstatus;
}

export declare type orderstatus =
  | 'incoming'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'rejected';
