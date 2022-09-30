export interface OrderItem {
  name: string;
  quantity: number;
}

export interface FoodOrder {
  customerId: string;
  customerName: string;
  address: string;
  items: OrderItem[];
}
