export interface OrderItem {
  name: string;
  quantity: number;
}

export interface FoodOrder {
  customerId: string;
  customerName: string;
  address: string;
  items: OrderItem[];
  status: status;
}

type status = 'incoming' | 'preparing' | 'ready' | 'delivered' | 'rejected';
