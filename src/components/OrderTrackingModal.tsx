import React, { useState } from 'react';
import { OrderItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Key, 
  Calendar, 
  User, 
  ShieldCheck, 
  PlayCircle,
  PackageCheck,
  Wheat,
  Share2
} from 'lucide-react';

interface OrderTrackingModalProps {
  orders: OrderItem[];
  selectedOrderId: string | null;
  onSelectOrder: (orderId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSimulateNextStage: (orderId: string) => void;
  onChatWithFarmer: (product: any) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  orders,
  selectedOrderId,
  onSelectOrder,
  isOpen,
  onClose,
  currentLang,
  onSimulateNextStage,
  onChatWithFarmer,
}) => {
  const [searchOrderId, setSearchOrderId] = useState('');
  const t = UI_TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  // Find active order or fall back to first order
  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const stages = [
    {
      stage: 1,
      title: t.orderPlaced,
      desc: 'Farmer accepted order directly',
      time: currentOrder?.orderDate || 'Today, 06:15 AM',
      icon: Clock,
    },
    {
      stage: 2,
      title: t.farmHarvested,
      desc: 'Hand-harvested fresh from the field and packed in clean crates',
      time: 'Today, 07:30 AM',
      icon: Wheat,
    },
    {
      stage: 3,
      title: t.qualityChecked,
      desc: 'Quality & weight checked at village collection point',
      time: 'Today, 09:45 AM',
      icon: ShieldCheck,
    },
    {
      stage: 4,
      title: t.outForDelivery,
      desc: `In transit via ${currentOrder?.vehicleNumber || 'Tata Ace Cold Van'}`,
      time: 'Today, 11:30 AM',
      icon: Truck,
    },
    {
      stage: 5,
      title: t.delivered,
      desc: 'Doorstep hand-off with OTP verification',
      time: currentOrder?.estimatedDelivery || 'Estimated by 04:30 PM',
      icon: PackageCheck,
    },
  ];

  const currentStageNum = currentOrder ? currentOrder.currentStage : 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) => o.orderNumber.toLowerCase() === searchOrderId.trim().toLowerCase()
    );
    if (found) {
      onSelectOrder(found.id);
      setSearchOrderId('');
    } else {
      alert(`Order with ID "${searchOrderId}" not found. Try KC-92841 or place a new order from cart.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200 max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 font-black text-2xl flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg">{t.trackMyOrder}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-emerald-200 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  Live GPS
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Direct Farm-to-Consumer cold-chain transit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Selector & Search Input */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* List of active orders tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => onSelectOrder(ord.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  currentOrder?.id === ord.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{ord.orderNumber}</span>
                <span className="text-[10px] opacity-80">({ord.product.name.split(' ')[0]})</span>
              </button>
            ))}
          </div>

          {/* Search by order ID form */}
          <form onSubmit={handleSearch} className="flex items-center gap-1.5 ml-auto">
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="Enter ID (KC-92841)"
              className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-36"
            />
            <button
              type="submit"
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Find
            </button>
          </form>
        </div>

        {/* Modal Scrollable Body */}
        {currentOrder ? (
          <div className="p-5 overflow-y-auto space-y-6">
            {/* Top Order Summary Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center text-3xl">
                  {currentOrder.product.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-base">
                      {currentOrder.orderNumber}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">
                      Stage {currentStageNum} of 5
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-emerald-950">
                    {currentOrder.product.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Quantity: {currentOrder.quantity} {currentOrder.product.unit.replace('per ', '')}s • Total: ₹{currentOrder.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Secure Delivery OTP Box */}
              <div className="bg-white p-3 rounded-2xl border-2 border-dashed border-amber-400 text-center shadow-xs ml-auto">
                <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-center gap-1">
                  <Key className="w-3 h-3 text-amber-500" />
                  <span>{t.deliveryOtp}</span>
                </div>
                <div className="font-mono text-xl font-black text-emerald-950 tracking-wider">
                  {currentOrder.otp}
                </div>
                <span className="text-[9px] text-slate-400">Share with rider only</span>
              </div>
            </div>

            {/* Live Progress Milestones Pipeline */}
            <div className="relative pl-6 sm:pl-8 space-y-6">
              {/* Pipeline Track Line */}
              <div className="absolute top-4 bottom-4 left-3 sm:left-4 w-1 bg-slate-200 rounded-full" />
              <div
                className="absolute top-4 left-3 sm:left-4 w-1 bg-emerald-600 rounded-full transition-all duration-700"
                style={{
                  height: `${((currentStageNum - 1) / (stages.length - 1)) * 100}%`,
                }}
              />

              {stages.map((stg) => {
                const isCompleted = currentStageNum >= stg.stage;
                const isCurrent = currentStageNum === stg.stage;
                const IconComponent = stg.icon;

                return (
                  <div key={stg.stage} className="relative flex items-start gap-4 group">
                    {/* Stage Bullet Node */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                    >
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>

                    {/* Stage Details */}
                    <div
                      className={`flex-1 p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                          : isCompleted
                          ? 'bg-white border-slate-200'
                          : 'bg-slate-50/50 border-slate-100 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h5
                          className={`font-black text-sm ${
                            isCurrent
                              ? 'text-emerald-950'
                              : isCompleted
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {stg.title}
                        </h5>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {stg.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {stg.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Live Route Progress Bar */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live GPS Transit Status:
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  {currentStageNum === 5 ? 'Arrived at Destination' : 'Estimated ETA: ~45 mins'}
                </span>
              </div>

              {/* Progress bar visualizer */}
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-green-400 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentStageNum / 5) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Wheat className="w-3 h-3 text-emerald-400" />
                  {currentOrder.product.location} (Farm)
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  {currentOrder.deliveryAddress}
                </span>
              </div>
            </div>

            {/* Delivery Rider & Farmer Contact Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Delivery Partner */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Delivery Partner
                  </span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-600">
                    Tata Cold Van
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">
                      {currentOrder.driverName || 'Rameshwar Gurjar'}
                    </h5>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {currentOrder.vehicleNumber || 'MP 04 GA 4821'}
                    </p>
                  </div>
                </div>

                {currentOrder.driverPhone && (
                  <a
                    href={`tel:${currentOrder.driverPhone}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    Call Delivery Rider
                  </a>
                )}
              </div>

              {/* Farmer Contact */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Harvesting Farmer
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-emerald-950 font-bold flex items-center justify-center text-lg">
                    {currentOrder.product.emoji}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">
                      {currentOrder.farmerName}
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      {currentOrder.product.location}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onChatWithFarmer(currentOrder.product);
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Wheat className="w-3.5 h-3.5 text-emerald-700" />
                  Chat with Farmer Directly
                </button>
              </div>
            </div>

            {/* Live Testing Simulation Button */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-medium">
                Want to test the live tracker? Click advance to progress the delivery stage:
              </div>
              <button
                onClick={() => onSimulateNextStage(currentOrder.id)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Simulate Next Stage ({currentStageNum}/5)</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-3">
            <Truck className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-700">No Orders Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't placed an order yet. Select items from the marketplace to enjoy direct farm-to-table delivery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
