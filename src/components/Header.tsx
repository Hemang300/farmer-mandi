import React, { useState } from 'react';
import { Language, UserRole } from '../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { 
  Sprout, 
  ShoppingCart, 
  Truck, 
  MessageSquare, 
  Globe, 
  UserCheck, 
  Tractor, 
  Sparkles,
  Menu,
  X,
  Award,
  ChevronDown,
  LogOut,
  User,
  PlusCircle
} from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  userRole: UserRole;
  onToggleRole: (role: UserRole) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  activeOrderCount: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenFounderModal: () => void;
  currentUser: string;
  isGuest: boolean;
  onLogout: () => void;
  onOpenAddProductModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  userRole,
  onToggleRole,
  cartCount,
  onOpenCart,
  onOpenTracking,
  activeOrderCount,
  activeSection,
  onNavigate,
  onOpenFounderModal,
  currentUser,
  isGuest,
  onLogout,
  onOpenAddProductModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = UI_TRANSLATIONS[currentLang];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const buyerNavItems = [
    { id: 'market', label: t.navMarket },
    { id: 'tracking', label: t.navTrackOrder, badge: activeOrderCount > 0 ? activeOrderCount : undefined },
    { id: 'reviews', label: t.navReviews },
    { id: 'faq', label: t.navFaq },
    { id: 'founder', label: t.navFounder },
  ];

  const sellerNavItems = [
    { id: 'dashboard', label: 'Dashboard (डैशबोर्ड)' },
    { id: 'listings', label: 'My Crops (मेरी फसलें)' },
    { id: 'orders', label: 'Farm Orders (ऑर्डर्स)', badge: activeOrderCount > 0 ? activeOrderCount : undefined },
    { id: 'reviews', label: t.navReviews },
    { id: 'faq', label: t.navFaq },
  ];

  const navItems = userRole === 'customer' ? buyerNavItems : sellerNavItems;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs transition-all">
      {/* Topmost Founder & Guarantee Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 text-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-emerald-950 font-extrabold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3" /> {t.founderBadge}
            </span>
            <span className="hidden sm:inline text-emerald-100">
              | {t.heroTitleAccent} • 100% Direct Payouts
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100 text-[11px]">
            <button 
              onClick={onOpenFounderModal}
              className="hover:text-amber-300 underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              Hemang Choudhary's Mission
            </button>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline font-mono">Toll-Free Helpline: 1800-KISAN-00</span>
          </div>
        </div>
      </div>

      {/* Guest Mode Alert Banner */}
      {isGuest && (
        <div className="bg-amber-500/15 border-b border-amber-300/40 text-amber-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                Guest Mode (अतिथि)
              </span>
              <span>
                You are previewing as {userRole === 'customer' ? 'Guest Customer' : 'Guest Farmer'}.
              </span>
            </div>
            <button
              onClick={onLogout}
              className="px-2.5 py-0.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-black rounded-lg text-xs transition-colors cursor-pointer"
            >
              Login with Account
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Current Window Indicator */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-emerald-950 group-hover:text-emerald-700 transition-colors">
                {t.appTitle}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                userRole === 'seller' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {userRole === 'seller' ? 'Farmer Window' : 'Buyer Window'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'tracking') {
                  onOpenTracking();
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                activeSection === item.id
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              {item.id === 'tracking' && <Truck className="w-4 h-4 text-emerald-600" />}
              {item.label}
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Side: Role Switcher, Language Dropdown, User Profile, Cart/Tracking, Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Toggle Switch */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => onToggleRole('customer')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                userRole === 'customer'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Buyer Window"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">{t.customer}</span>
              <span className="sm:hidden">Buyer</span>
            </button>
            <button
              onClick={() => onToggleRole('seller')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                userRole === 'seller'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Farmer Portal"
            >
              <Tractor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.farmer}</span>
              <span className="sm:hidden">Farmer</span>
            </button>
          </div>

          {/* Add Product Button (Farmer Window only) */}
          {userRole === 'seller' && onOpenAddProductModal && (
            <button
              onClick={onOpenAddProductModal}
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs items-center gap-1 shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add Crop</span>
            </button>
          )}

          {/* Multilingual Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
              title="Change Language"
            >
              <span className="text-base leading-none">{currentLangObj.flag}</span>
              <span className="font-semibold hidden sm:inline">{currentLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Language / भाषा चुनें
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                      currentLang === lang.code ? 'text-emerald-700 bg-emerald-50/70 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {lang.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Real-time Order Tracking Quick Button */}
          <button
            onClick={onOpenTracking}
            className="relative p-2 rounded-xl border border-emerald-200 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            title={t.navTrackOrder}
          >
            <Truck className="w-5 h-5 text-emerald-700" />
            <span className="hidden xl:inline text-xs font-bold">{t.navTrackOrder}</span>
            {activeOrderCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
                {activeOrderCount}
              </span>
            )}
          </button>

          {/* Cart Button (Buyer Window only) */}
          {userRole === 'customer' && (
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 transition-all shadow-md shadow-emerald-700/20 flex items-center gap-1.5 cursor-pointer"
              title={t.cart}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold">{t.cart}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-rose-500 text-white rounded-full text-xs font-black flex items-center justify-center ring-2 ring-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile & Logout Button */}
          <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-black text-slate-800 leading-tight truncate max-w-[110px]">
                {currentUser}
              </span>
              <span className="text-[10px] font-bold text-emerald-700">
                {isGuest ? 'Guest' : userRole === 'customer' ? 'Buyer' : 'Farmer'}
              </span>
            </div>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
              title="लॉगआउट / Switch User or Role"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-3 shadow-lg">
          <div className="p-2.5 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900">{currentUser}</div>
              <div className="text-[10px] text-emerald-700 font-semibold">
                {userRole === 'customer' ? 'Buyer Window' : 'Farmer Window'} {isGuest && '(Guest)'}
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-2.5 py-1 text-xs font-bold bg-rose-100 text-rose-700 rounded-lg"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'tracking') {
                    onOpenTracking();
                  } else {
                    onNavigate(item.id);
                  }
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 text-left text-xs font-bold rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenFounderModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Founder Hemang Choudhary's Vision
          </button>
        </div>
      )}
    </header>
  );
};
