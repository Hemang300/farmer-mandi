import React, { useState } from 'react';
import { 
  Product, 
  ReviewItem, 
  FaqItem, 
  OrderItem, 
  Language, 
  UserRole 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_FAQS, 
  MANDI_RATES, 
  INITIAL_ORDERS 
} from './data/mockData';
import { UI_TRANSLATIONS } from './data/translations';
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { MandiTicker } from './components/MandiTicker';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { DirectChatModal } from './components/DirectChatModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { FounderSection } from './components/FounderSection';
import { FarmerDashboard } from './components/FarmerDashboard';
import { CartDrawer } from './components/CartDrawer';
import { AddProductModal } from './components/AddProductModal';
import { FounderModal } from './components/FounderModal';
import { 
  Search, 
  Store, 
  Sparkles, 
  Leaf, 
  PhoneCall, 
  CheckCircle2, 
  Heart, 
  Wheat, 
  Tractor,
  Award,
  UserCheck,
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function App() {
  // App Lifecycle States: Splash Screen -> Login Page -> Main App Window
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>('Guest');
  const [isGuest, setIsGuest] = useState<boolean>(true);

  // Multilingual State (Hindi default for Indian rural context, easy switch)
  const [currentLang, setCurrentLang] = useState<Language>('hi');
  
  // Role State: 'customer' (Buyer Window) or 'seller' (Farmer Window)
  const [userRole, setUserRole] = useState<UserRole>('customer');

  // Products and Listings
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);

  // Cart State
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  // Direct Chat State
  const [chatProduct, setChatProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Order Tracking State
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id || null);

  // Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);
  const [isFounderModalOpen, setIsFounderModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('market');

  const t = UI_TRANSLATIONS[currentLang];

  // Auth Handlers
  const handleLoginSuccess = (role: UserRole, userName: string, guestMode: boolean) => {
    setUserRole(role);
    setCurrentUser(userName);
    setIsGuest(guestMode);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsGuest(true);
    setCurrentUser('Guest');
    setCart([]);
  };

  // Cart Functions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setLastAddedId(product.id);
    setTimeout(() => setLastAddedId(null), 1500);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Create a real new order in the live tracking pipeline!
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNum = `KC-${Math.floor(10000 + Math.random() * 90000)}`;
    const primaryItem = cart[0];

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      product: primaryItem.product,
      quantity: primaryItem.quantity,
      totalAmount: cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0) + 50,
      orderDate: 'Just now',
      estimatedDelivery: 'Tomorrow morning by 10:00 AM',
      status: 'confirmed',
      currentStage: 1,
      driverName: 'Mohan Lal Verma',
      driverPhone: '+91 98110 55421',
      vehicleNumber: 'DL 1L AA 4012 (Insulated Cold Van)',
      otp: randomOtp,
      deliveryAddress: 'Customer Doorstep (Priority Express Route)',
      customerName: currentUser,
      farmerName: primaryItem.product.farmerName,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSelectedOrderId(newOrder.id);
    setCart([]);
    setIsCartOpen(false);

    // Open real-time tracking modal automatically to delight user
    setTimeout(() => {
      setIsTrackingOpen(true);
    }, 400);
  };

  // Direct Chat Handler
  const handleOpenDirectChat = (product: Product) => {
    setChatProduct(product);
    setIsChatOpen(true);
  };

  // Tracking Stage Advance Simulation
  const handleSimulateNextStage = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextStage = Math.min(ord.currentStage + 1, 5);
          let newStatus = ord.status;
          if (nextStage === 2) newStatus = 'harvested';
          if (nextStage === 3) newStatus = 'picked_up';
          if (nextStage === 4) newStatus = 'in_transit';
          if (nextStage === 5) newStatus = 'delivered';
          return {
            ...ord,
            currentStage: nextStage,
            status: newStatus as any,
          };
        }
        return ord;
      })
    );
  };

  // Filtered Products
  const filteredProducts = products.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }
    if (organicOnly && !prod.isOrganic) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(q);
      const matchFarmer = prod.farmerName.toLowerCase().includes(q);
      const matchLoc = prod.location.toLowerCase().includes(q);
      const matchDesc = prod.desc.toLowerCase().includes(q);
      return matchName || matchFarmer || matchLoc || matchDesc;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: t.allCategories, emoji: '🛒' },
    { id: 'grain', label: t.grains, emoji: '🌾' },
    { id: 'vegetable', label: t.vegetables, emoji: '🥬' },
    { id: 'fruit', label: t.fruits, emoji: '🍎' },
    { id: 'dairy', label: t.dairy, emoji: '🥛' },
  ];

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Splash Screen View
  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => setShowSplash(false)}
        currentLang={currentLang}
      />
    );
  }

  // 2. Dedicated Login Screen with Guest Mode and Role Selection
  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLoginSuccess}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
      />
    );
  }

  // 3. Main Application Window (Separate Windows for Buyer vs Seller)
  return (
    <div className="min-h-screen bg-[#f7faf4] text-slate-800 font-sans flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Top APMC Live Mandi Rate Ticker */}
      <MandiTicker rates={MANDI_RATES} languageLabel={t.liveMandiRates} />

      {/* Main Responsive Header with Window Indicator & Logout */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        userRole={userRole}
        onToggleRole={setUserRole}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        activeOrderCount={orders.filter((o) => o.status !== 'delivered').length}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenFounderModal={() => setIsFounderModalOpen(true)}
        currentUser={currentUser}
        isGuest={isGuest}
        onLogout={handleLogout}
        onOpenAddProductModal={() => setIsAddProductOpen(true)}
      />

      {/* Distinct Separate Window for Seller / Farmer vs Buyer / Customer */}
      {userRole === 'seller' ? (
        /* ================== DEDICATED SELLER / FARMER WINDOW ================== */
        <main className="flex-1">
          <FarmerDashboard
            products={products}
            orders={orders}
            currentLang={currentLang}
            onOpenAddProductModal={() => setIsAddProductOpen(true)}
            onOpenChatWithCustomer={(prod) => handleOpenDirectChat(prod)}
            onSwitchToCustomer={() => setUserRole('customer')}
          />

          {/* Farmer Reviews & FAQs in Seller Window */}
          <div className="bg-white">
            <ReviewsSection
              reviews={reviews}
              currentLang={currentLang}
              onAddReview={(newRev) => setReviews([newRev, ...reviews])}
            />
            <FaqSection faqs={INITIAL_FAQS} currentLang={currentLang} />
          </div>
        </main>
      ) : (
        /* ================== DEDICATED BUYER / CUSTOMER WINDOW ================== */
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            currentLang={currentLang}
            onBrowseMarket={() => handleNavigate('market')}
            onOpenChat={() => handleOpenDirectChat(products[0])}
            onOpenTracking={() => setIsTrackingOpen(true)}
            onOpenFounderModal={() => setIsFounderModalOpen(true)}
          />

          {/* Fresh Mandi Marketplace Section */}
          <section id="market" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Search & Filter Bar */}
            <div className="space-y-6 mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                    <Store className="w-3.5 h-3.5" />
                    <span>{t.navMarket}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Harvested Fresh from <span className="text-emerald-700">Verified Farms</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                    Direct prices set by farmers themselves • 0% middlemen commission
                  </p>
                </div>

                {/* Big Search Input */}
                <div className="relative w-full md:w-96">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Pills & Organic Filter */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-2xs ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-emerald-700 to-green-700 text-white shadow-md shadow-emerald-700/20'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* 100% Organic Toggle */}
                <button
                  onClick={() => setOrganicOnly(!organicOnly)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                    organicOnly
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Leaf className={`w-3.5 h-3.5 ${organicOnly ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{t.organicCertified}</span>
                </button>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currentLang={currentLang}
                    onAddToCart={handleAddToCart}
                    onOpenDirectChat={handleOpenDirectChat}
                    isAdded={lastAddedId === product.id}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
                <Store className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-base text-slate-800">No matching produce found</h3>
                <p className="text-xs text-slate-500">
                  Try searching for wheat, tomatoes, apples, milk, or clear active category filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setOrganicOnly(false);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* Customer Reviews with Rating System */}
          <ReviewsSection
            reviews={reviews}
            currentLang={currentLang}
            onAddReview={(newRev) => setReviews([newRev, ...reviews])}
          />

          {/* Dedicated Section on Founder Hemang Choudhary */}
          <FounderSection currentLang={currentLang} />

          {/* Comprehensive Multilingual FAQ Section */}
          <FaqSection faqs={INITIAL_FAQS} currentLang={currentLang} />
        </main>
      )}

      {/* Direct Chat Modal */}
      <DirectChatModal
        product={chatProduct || products[0]}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        currentLang={currentLang}
      />

      {/* Real-time Order Tracking Modal */}
      <OrderTrackingModal
        orders={orders}
        selectedOrderId={selectedOrderId}
        onSelectOrder={setSelectedOrderId}
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        currentLang={currentLang}
        onSimulateNextStage={handleSimulateNextStage}
        onChatWithFarmer={(prod) => handleOpenDirectChat(prod)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        currentLang={currentLang}
      />

      {/* Add Product Modal for Farmers */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={(newProd) => {
          setProducts([newProd, ...products]);
        }}
        currentLang={currentLang}
      />

      {/* Founder Hemang Choudhary Modal */}
      <FounderModal
        isOpen={isFounderModalOpen}
        onClose={() => setIsFounderModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1: Brand & Founder */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-emerald-950 font-black text-xl shadow-md">
                  🌾
                </div>
                <span className="font-black text-2xl text-white tracking-tight">
                  KisanConnect
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-normal">
                India’s premier direct-to-farm marketplace founded by <b>Hemang Choudhary</b>. Empowering hardworking farmers with 100% earnings, 0% commission, and delivering fresh food to Indian homes.
              </p>
              <div className="inline-flex items-center gap-2 bg-emerald-900/80 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-800">
                <Award className="w-3.5 h-3.5" />
                <span>Founder: Hemang Choudhary</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                Quick Features
              </h4>
              <ul className="space-y-2 text-xs text-emerald-200 font-medium">
                <li>
                  <button onClick={() => handleNavigate('market')} className="hover:text-amber-300 cursor-pointer">
                    Fresh Mandi Products
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsTrackingOpen(true)} className="hover:text-amber-300 cursor-pointer">
                    Live GPS Order Tracking
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpenDirectChat(products[0])} className="hover:text-amber-300 cursor-pointer">
                    Direct Farmer Chat & Bargain
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('reviews')} className="hover:text-amber-300 cursor-pointer">
                    Customer & Farmer Reviews
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('faq')} className="hover:text-amber-300 cursor-pointer">
                    FAQs & Help
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: For Farmers */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                अन्नदाता सहायता (For Farmers)
              </h4>
              <ul className="space-y-2 text-xs text-emerald-200 font-medium">
                <li>
                  <button onClick={() => setUserRole('seller')} className="hover:text-amber-300 cursor-pointer">
                    Farmer Portal / Seller Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsAddProductOpen(true)} className="hover:text-amber-300 cursor-pointer">
                    List Your Crop (0% Commission)
                  </button>
                </li>
                <li>
                  <span className="text-emerald-300">24-Hour Direct Bank Payout</span>
                </li>
                <li>
                  <span className="text-emerald-300">Farm Gate Cold-Chain Pickup</span>
                </li>
                <li>
                  <button onClick={() => setIsFounderModalOpen(true)} className="hover:text-amber-300 cursor-pointer">
                    Hemang Choudhary's Mission
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Rural Helpline & Reach */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                24/7 Helpline
              </h4>
              <p className="text-xs text-emerald-200">
                Call our multi-lingual support team in Hindi, English, Punjabi, Marathi, Gujarati, Bengali, or Telugu:
              </p>
              <div className="bg-emerald-900/60 p-3 rounded-2xl border border-emerald-800 space-y-1">
                <div className="text-xs font-mono font-bold text-amber-300">
                  Toll-Free: 1800-KISAN-00 (1800-54726-00)
                </div>
                <div className="text-[11px] text-emerald-300">
                  Email: support@kisanconnect.in
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold">
                New Delhi • Bhopal • Chandigarh • Pune • Jaipur
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-emerald-900 text-center text-xs text-emerald-400 font-medium flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              © 2026 KisanConnect. Founded by <b>Hemang Choudhary</b>. Dedicated to Indian Farmers & Families.
            </div>
            <div className="flex items-center gap-2 text-[11px] text-amber-300 font-bold">
              <span>🌾 शुद्ध अन्न, समृद्ध किसान</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
