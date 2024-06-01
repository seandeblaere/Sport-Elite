export type productBody = {
  productId: string;
  quantity: number;
  _id?: string;
};

export type CreateOrderBody = {
  products: productBody[];
};

export type Order = {
  userId: string;
  products: productBody[];
  total: number;
  status: string;
  _id: string;
};
