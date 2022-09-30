export interface orderItem {
  name: string;
  quantity: number;
}

export interface foodOrder {
  customerId: string;
  customerName: string;
  address: string;
  items: orderItem[];
}
