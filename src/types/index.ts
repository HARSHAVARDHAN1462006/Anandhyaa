export type ProductCategory = 'milk' | 'ghee' | 'paneer' | 'curd' | 'lassi' | 'butter';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type DeliverySlot = 'morning_6_9' | 'evening_5_8';

export type PaymentMethod = 'razorpay' | 'cod';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}
