export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  batchNumber: string;
  expirationDate: string;
  manufacturingDate: string;
}



export interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: PurchaseItem[];
  status: 'pending' | 'approved' | 'received';
  totalAmount: number;
  createdAt: string;
}

export interface PurchaseItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface ProductionOrder {
  id: string;
  productId: string;
  quantity: number;
  status: 'planned' | 'in-progress' | 'completed';
  startDate: string;
  endDate: string;
  batchNumber: string;
}

export interface QualityControl {
  id: string;
  productionOrderId: string;
  temperature: number;
  humidity: number;
  ph: number;
  inspectedBy: string;
  status: 'approved' | 'rejected';
  notes: string;
}

export type NotificationPriority = 'low' | 'medium' | 'high';
export type NotificationType = 'alert' | 'info' | 'warning';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  isEncrypted: boolean;
  category: string;
  metadata?: Record<string, unknown>;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  categories: string[];
  mutedUntil?: string;
  updatedAt: string;
}