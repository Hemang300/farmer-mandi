export type Language = 'en' | 'hi' | 'pa' | 'mr' | 'bn' | 'te' | 'gu';

export type UserRole = 'customer' | 'seller';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  desc: string;
  price: number;
  unit: string;
  category: 'grain' | 'vegetable' | 'fruit' | 'dairy' | 'pulse' | 'spices';
  tag: string;
  emoji: string;
  image?: string;
  farmerName: string;
  location: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isOrganic: boolean;
  harvestDate?: string;
  phone?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  role: 'customer' | 'farmer';
  targetName: string; // e.g. "Rajesh Kumar (Farmer)" or "Amit Verma (Buyer)"
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatarInitial: string;
  location: string;
  tags?: string[];
  helpfulCount?: number;
}

export interface FaqItem {
  id: string;
  targetRole: 'customer' | 'farmer' | 'all';
  question: {
    en: string;
    hi: string;
    pa: string;
    mr: string;
    bn: string;
    te: string;
    gu: string;
  };
  answer: {
    en: string;
    hi: string;
    pa: string;
    mr: string;
    bn: string;
    te: string;
    gu: string;
  };
  category: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'farmer';
  senderName: string;
  text: string;
  timestamp: string;
  isOffer?: boolean;
  offerAmount?: number;
  offerUnit?: string;
  offerStatus?: 'pending' | 'accepted' | 'declined';
  audioDuration?: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  product: Product;
  quantity: number;
  totalAmount: number;
  orderDate: string;
  estimatedDelivery: string;
  status: 'confirmed' | 'harvested' | 'picked_up' | 'in_transit' | 'delivered';
  currentStage: number; // 1 to 5
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  otp: string;
  deliveryAddress: string;
  customerName: string;
  farmerName: string;
  coordinates?: { lat: number; lng: number };
}

export interface MandiRate {
  id: string;
  crop: string;
  mandi: string;
  state: string;
  pricePerQuintal: number;
  change: number; // percentage
  trend: 'up' | 'down';
}
