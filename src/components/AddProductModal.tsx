import React, { useState } from 'react';
import { Product, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { X, PlusCircle, Tractor, Sparkles, Leaf } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  currentLang: Language;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  currentLang,
}) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('per quintal');
  const [category, setCategory] = useState<'grain' | 'vegetable' | 'fruit' | 'dairy' | 'pulse' | 'spices'>('grain');
  const [emoji, setEmoji] = useState('🌾');
  const [farmerName, setFarmerName] = useState('Chaudhary Ji');
  const [location, setLocation] = useState('Karnal, Haryana');
  const [isOrganic, setIsOrganic] = useState(true);
  const [tag, setTag] = useState('Fresh Harvest');

  if (!isOpen) return null;

  const emojiOptions = ['🌾', '🍅', '🥔', '🧅', '🥛', '🧈', '🍎', '🥭', '🌽', '🫑', '🥬', '🌶️'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert('Please fill crop name and price.');
      return;
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      desc: desc.trim() || 'Directly grown on our family farm without chemical adulteration.',
      price: parseInt(price) || 1000,
      unit,
      category,
      tag: tag || 'Fresh Harvest',
      emoji,
      farmerName: farmerName.trim() || 'Verified Farmer',
      location: location.trim() || 'Punjab/Haryana',
      rating: 5.0,
      reviewCount: 1,
      stock: 50,
      isOrganic,
      harvestDate: 'Today Fresh',
      phone: '+91 98765 00000',
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Tractor className="w-5 h-5 text-amber-300" />
            <h3 className="font-black text-lg">नई फसल लिस्ट करें (Add New Harvest)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Choose Emoji / Symbol */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              फसल का चिन्ह चुनें (Select Crop Emoji)
            </label>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji(em)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                    emoji === em
                      ? 'bg-amber-100 border-amber-400 scale-110 shadow-xs ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Crop Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              फसल का नाम (Crop / Produce Name) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="उदा. देशी गेहूं, बासमती धान, लाल प्याज..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {/* Price & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                दाम (Price in ₹) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="उदा. 2400"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                इकाई (Unit)
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              >
                <option value="per quintal">प्रति क्विंटल (per quintal)</option>
                <option value="per kg">प्रति किलो (per kg)</option>
                <option value="per liter">प्रति लीटर (per liter)</option>
                <option value="per crate">प्रति क्रेट (per crate)</option>
              </select>
            </div>
          </div>

          {/* Category & Tag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                श्रेणी (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              >
                <option value="grain">अनाज (Grain)</option>
                <option value="vegetable">सब्जी (Vegetable)</option>
                <option value="fruit">फल (Fruit)</option>
                <option value="dairy">डेयरी (Dairy)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                टैग (Tag)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Fresh Harvest, A-Grade..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Farmer & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                किसान / खेत का नाम
              </label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                गांव / जिला, राज्य
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Organic checkbox toggle */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-xs font-bold text-emerald-950">100% जैविक / रासायनिक-मुक्त</span>
                <p className="text-[10px] text-emerald-700">Zero synthetic chemical fertilizers</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          {/* Submit buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Listing (0% Commission)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
