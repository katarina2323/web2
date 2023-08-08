export interface Createorder {
  id: string;
  comment: string;
  address: string;
  creationTime: Date;
  deliveryTime: Date;
  price: number;
  status: string;
  item: {
    articleName: string;
    id: number;
    quantity: number;
  };
}

export interface CancelOrder {
  orderId: number;
  userId: number;
}
