import React from 'react';
import { Product, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  currentLang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  currentLang,
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? 50 : 0;
  const totalAmount = subtotal + deliveryFee;

  const handleProceedCheckout = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // fallback
    }
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-green-900 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h3 className="font-black text-lg">{t.cart}</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-200 text-xs font-black">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subsidized rural note */}
          <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center gap-2 text-[11px] font-bold text-emerald-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>100% of the produce price goes directly to the verified farmer!</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {cartItems.length > 0 ? (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100 shrink-0">
                    {product.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-sm text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Farmer: {product.farmerName}
                    </p>
                    <div className="text-xs font-black text-emerald-900 mt-1">
                      ₹{product.price}{' '}
                      <span className="font-normal text-slate-400">/{product.unit.replace('per ', '')}</span>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        onClick={() => onUpdateQty(product.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 cursor-pointer shadow-2xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(product.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <ShoppingBag className="w-16 h-16 text-slate-300" />
                <h4 className="font-bold text-slate-800 text-base">Your Cart is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Browse our fresh mandi to select organic wheat, pure A2 ghee, vegetables, and orchard fruits!
                </p>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-slate-200 space-y-3 shadow-lg">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Farm Produce Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    Cold-Chain Logistics
                  </span>
                  <span className="font-bold text-emerald-700">₹{deliveryFee}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm sm:text-base font-black text-slate-950">
                  <span>{t.totalAmount}</span>
                  <span className="text-emerald-950">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm shadow-xl shadow-emerald-700/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-101 active:scale-98"
              >
                <span>{t.checkoutNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe Escrow • Farmer Paid on Delivery Confirmation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
