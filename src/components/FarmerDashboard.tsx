import React from 'react';
import { Product, OrderItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  Tractor, 
  PlusCircle, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  Truck, 
  Clock, 
  Sparkles,
  PhoneCall,
  Volume2,
  Trash2,
  Eye,
  Store
} from 'lucide-react';

interface FarmerDashboardProps {
  products: Product[];
  orders: OrderItem[];
  currentLang: Language;
  onOpenAddProductModal: () => void;
  onOpenChatWithCustomer: (product: Product) => void;
  onSwitchToCustomer: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  products,
  orders,
  currentLang,
  onOpenAddProductModal,
  onOpenChatWithCustomer,
  onSwitchToCustomer,
}) => {
  const t = UI_TRANSLATIONS[currentLang];

  // Calculate simulated farmer metrics
  const totalEarnings = orders.reduce((sum, ord) => sum + ord.totalAmount, 0) + 48200;
  const activeListingsCount = products.length;
  const pendingOrdersCount = orders.filter((o) => o.status !== 'delivered').length;

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 font-black text-xs uppercase tracking-wider">
                <Tractor className="w-3.5 h-3.5" />
                <span>Kisan Dashboard • किसान पोर्टल</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                राम राम, किसान भाई! 🌾
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200 max-w-xl font-normal">
                KisanConnect पर आपका स्वागत है। यहाँ आपकी फसल का पूरा भाव सीधा आपके बैंक खाते में 24 घंटे में जमा होता है। शून्य कमीशन, सीधा ग्राहक।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAddProductModal}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-emerald-950 font-black text-sm hover:from-amber-300 hover:to-yellow-300 transition-all shadow-lg flex items-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <PlusCircle className="w-5 h-5 text-emerald-950" />
                <span>+ नई फसल / उत्पाद जोड़ें (List Crop)</span>
              </button>

              <button
                onClick={onSwitchToCustomer}
                className="px-4 py-3.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-xs border border-emerald-600 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Store className="w-4 h-4 text-emerald-300" />
                <span>Switch to Buyer Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Large Touch Metrics Cards for Rural Usability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">
                कुल बैंक भुगतान (Payout)
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                ₹
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-950">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Direct Account Transfer (0% Cut)</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">
                सक्रिय फसलें (Active Crops)
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {activeListingsCount} Fasal
            </div>
            <div className="text-[11px] font-bold text-slate-500">
              Listed across India's Digital Mandi
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">
                ऑर्डर डिलीवरी बाकी (Pending)
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {pendingOrdersCount} Orders
            </div>
            <div className="text-[11px] font-bold text-blue-600">
              Pickup vehicle scheduled today
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">
                किसान रेटिंग (Rating)
              </span>
              <div className="w-9 h-9 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
                ★
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 flex items-center gap-2">
              <span>4.9</span>
              <span className="text-sm font-bold text-amber-500">★★★★★</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-700">
              Top Rated Verified Annadata
            </div>
          </div>
        </div>

        {/* Section: Your Listed Crops */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                आपकी लिस्टेड फसलें (Your Harvest Listings)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                सीधे ग्राहकों को प्रदर्शित होने वाले उत्पाद
              </p>
            </div>

            <button
              onClick={onOpenAddProductModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Crop</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-3xl border border-slate-100">
                    {prod.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                      {prod.tag}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 truncate mt-1">
                      {prod.name}
                    </h4>
                    <p className="text-xs font-black text-emerald-900">
                      ₹{prod.price} <span className="font-normal text-slate-500">{prod.unit}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-500 font-medium">
                    Stock: <b>{prod.stock}</b>
                  </span>

                  <button
                    onClick={() => onOpenChatWithCustomer(prod)}
                    className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-800 font-bold border border-emerald-300 rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Open Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Incoming Direct Orders for Packing */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                हाल के ऑर्डर्स (Live Farm Orders)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                ग्राहकों द्वारा दिए गए सीधे ऑर्डर्स जिनकी पैकिंग व पिकअप होनी है
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              Cold-Chain Pickup Guaranteed
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-3xl">
                    {ord.product.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full uppercase">
                        Stage {ord.currentStage}/5
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-800">
                      {ord.product.name} ({ord.quantity} {ord.product.unit})
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Buyer: {ord.customerName} • {ord.deliveryAddress}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-base text-emerald-950">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700">
                    Direct Payout: 100%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Support Card */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="font-black text-lg">फसल बेचने में सहायता चाहिए?</h3>
            <p className="text-xs font-medium text-emerald-950/90 mt-0.5">
              हेमांग चौधरी जी की किसान सहायता टीम चौबीसों घंटे आपके सहयोग के लिए तैयार है।
            </p>
          </div>
          <a
            href="tel:18001801551"
            className="px-6 py-3 rounded-2xl bg-emerald-950 text-white font-black text-xs shadow-md flex items-center gap-2 hover:bg-emerald-900 transition-colors shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>मुफ्त कॉल: 1800-KISAN-00</span>
          </a>
        </div>
      </div>
    </div>
  );
};
