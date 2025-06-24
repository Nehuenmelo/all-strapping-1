export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
  subcategory: string;
}

export interface OrderFormData {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  notes: string;
}

export interface OrderSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onSubmitOrder: (formData: OrderFormData) => void;
}
