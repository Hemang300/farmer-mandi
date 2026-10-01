import React from 'react';
import { Product, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  MessageSquare, 
  ShoppingCart, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Leaf, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currentLang: Language;
  onAddToCart: (product: Product) => void;
  onOpenDirectChat: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentLang,
  onAddToCart,
  onOpenDirectChat,
  isAdded = false,
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group">
      {/* Top Image & Badge Container */}
      <div className="relative h-48 bg-emerald-50 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-emerald-100 to-green-50">
            {product.emoji}
          </div>
        )}

        {/* Floating Category Emoji Icon */}
        <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-2xl border border-white">
          {product.emoji}
        </div>

        {/* Badges: Tag & Organic */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <span className="bg-emerald-700/95 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs uppercase tracking-wider">
            {product.tag}
          </span>
          {product.isOrganic && (
            <span className="bg-amber-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Leaf className="w-3 h-3 text-emerald-950" />
              100% Organic
            </span>
          )}
        </div>

        {/* Harvest Date Banner */}
        {product.harvestDate && (
          <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-300" />
            <span>Harvest: {product.harvestDate}</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Farmer & Location Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <div className="flex items-center gap-1 font-bold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              <span>{product.farmerName}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{product.location}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>

          {/* Product Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
            {product.desc}
          </p>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black text-amber-900">{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              ({product.reviewCount} reviews)
            </span>
            <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Stock: {product.stock} {product.unit.replace('per ', '')}s
            </span>
          </div>
        </div>

        {/* Pricing & Interactive Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          {/* Price Display */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">Direct Mandi Price</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-emerald-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  /{product.unit.replace('per ', '')}
                </span>
              </div>
            </div>

            {/* Quick Call Link for rural users */}
            {product.phone && (
              <a
                href={`tel:${product.phone.replace(/[^0-9+]/g, '')}`}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title={`Call ${product.farmerName}`}
              >
                <Phone className="w-4 h-4 text-emerald-700" />
              </a>
            )}
          </div>

          {/* Action Row: Direct Chat & Add to Cart */}
          <div className="grid grid-cols-2 gap-2">
            {/* Direct Chat with Farmer Button */}
            <button
              onClick={() => onOpenDirectChat(product)}
              className="py-2.5 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-101 active:scale-98"
              title="Chat directly with this verified farmer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>{t.chatWithFarmer}</span>
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product)}
              className={`py-2.5 px-3 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-700/15 hover:scale-101 active:scale-98 ${
                isAdded
                  ? 'bg-emerald-800 text-white'
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isAdded ? t.addedToCart : t.addToCart}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
