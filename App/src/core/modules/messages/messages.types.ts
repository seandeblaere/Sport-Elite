export type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  productId: string;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};
