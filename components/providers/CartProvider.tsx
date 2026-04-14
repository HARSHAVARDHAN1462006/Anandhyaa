'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

interface CartItem {
  productId: string;
  name:      string;
  price:     number;
  unit:      string;
  image:     string;
  quantity:  number;
}

interface CartContextType {
  items:       CartItem[];
  totalItems:  number;
  totalPrice:  number;
  addToCart:   (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQty:   (productId: string, quantity: number) => void;
  clearCart:   () => void;
  isOpen:      boolean;
  setIsOpen:   (v: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items,   setItems]   = useState<CartItem[]>([]);
  const [isOpen,  setIsOpen]  = useState(false);

  useEffect(() => {
    fetch('/api/cart')
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data) ? data : []));
  }, []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const addToCart = useCallback(async (item: Omit<CartItem, 'quantity'>) => {
    const res  = await fetch('/api/cart', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ...item, quantity: 1 }),
    });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    toast.success(`${item.name} added to cart!`);
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    const res  = await fetch('/api/cart', {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ productId }),
    });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    toast.success('Item removed');
  }, []);

  const updateQty = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) { removeFromCart(productId); return; }
    setItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{
      items, totalItems, totalPrice,
      addToCart, removeFromCart, updateQty, clearCart,
      isOpen, setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}
