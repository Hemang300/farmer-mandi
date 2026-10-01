import React, { useState } from 'react';
import { UserRole, Language } from '../types';
import { UI_TRANSLATIONS, LANGUAGES } from '../data/translations';
import { 
  UserCheck, 
  Tractor, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  CheckCircle2
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: UserRole, userName: string, isGuest: boolean) => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  currentLang,
  onSelectLang,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [nameOrPhone, setNameOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const t = UI_TRANSLATIONS[currentLang];
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameOrPhone.trim()) {
      setError('कृपया नाम या मोबाइल नंबर दर्ज करें (Please enter name or phone)');
      return;
    }
    if (!password) {
      setError('कृपया पासवर्ड दर्ज करें (Please enter password)');
      return;
    }
    setError('');
    onLogin(selectedRole, nameOrPhone.trim(), false);
  };

  const handleGuestEntry = () => {
    const guestName = selectedRole === 'customer' ? 'Guest Buyer' : 'Guest Farmer';
    onLogin(selectedRole, guestName, true);
  };

  const handleQuickFill = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'customer') {
      setNameOrPhone('Anand Verma (Buyer)');
      setPassword('kisan123');
    } else {
      setNameOrPhone('Gurpreet Singh (Farmer)');
      setPassword('kisan123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative select-none">
      {/* Background Motifs */}
      <div className="absolute top-10 left-10 text-8xl opacity-10 pointer-events-none">🌾</div>
      <div className="absolute bottom-10 right-10 text-8xl opacity-10 pointer-events-none">🚜</div>

      {/* Top Navbar with Language Selector and Founder Tag */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-amber-400 text-emerald-950 font-black text-lg flex items-center justify-center shadow-md">
            🌾
          </div>
          <div>
            <span className="font-black text-white text-lg tracking-tight">KisanConnect</span>
            <span className="block text-[10px] text-amber-300 font-bold">
              Founder: Hemang Choudhary
            </span>
          </div>
        </div>

        {/* Language Selector Dropdown on Login Screen */}
        <div className="flex items-center gap-1.5 bg-emerald-900/80 px-2.5 py-1 rounded-xl border border-emerald-700/60 text-xs font-bold text-emerald-100">
          <span className="text-base">{currentLangObj.flag}</span>
          <select
            value={currentLang}
            onChange={(e) => onSelectLang(e.target.value as Language)}
            className="bg-transparent text-emerald-100 font-bold focus:outline-none cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-emerald-950 text-white">
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/80 animate-in fade-in zoom-in-95 duration-500">
        {/* Card Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Digital Mandi Login • डिजिटल मंडी</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome to KisanConnect
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Apna role choose karein aur seedha start karein
          </p>
        </div>

        {/* Role Selection Tabs: Customer vs Seller */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Customer / Buyer Card */}
          <button
            type="button"
            onClick={() => setSelectedRole('customer')}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 cursor-pointer ${
              selectedRole === 'customer'
                ? 'bg-emerald-50/90 border-emerald-600 shadow-md shadow-emerald-600/10 scale-102'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors ${
                selectedRole === 'customer'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-sm block text-slate-900">
                {t.customer}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Browse & Order Fresh Produce
              </span>
            </div>
            {selectedRole === 'customer' && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active Selection
              </span>
            )}
          </button>

          {/* Farmer / Seller Card */}
          <button
            type="button"
            onClick={() => setSelectedRole('seller')}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 cursor-pointer ${
              selectedRole === 'seller'
                ? 'bg-amber-50/90 border-amber-500 shadow-md shadow-amber-500/15 scale-102'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors ${
                selectedRole === 'seller'
                  ? 'bg-amber-500 text-emerald-950'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-sm block text-slate-900">
                {t.farmer}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                List Crops & Get 0% Cut
              </span>
            </div>
            {selectedRole === 'seller' && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Active Selection
              </span>
            )}
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Name or Mobile */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {selectedRole === 'customer'
                ? 'नाम या मोबाइल नंबर (Full Name or Phone)'
                : 'किसान / खेत का नाम या मोबाइल (Farmer Name or Phone)'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={nameOrPhone}
                onChange={(e) => setNameOrPhone(e.target.value)}
                placeholder={
                  selectedRole === 'customer' ? 'उदा. आनंद वर्मा (Bhopal)' : 'उदा. सरदार गुरप्रीत सिंह (Sehore)'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              पासवर्ड (Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-11 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl animate-shake">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101 active:scale-99 ${
              selectedRole === 'customer'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-emerald-700/25'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 shadow-amber-500/25'
            }`}
          >
            <span>
              {selectedRole === 'customer' ? 'ग्राहक के रूप में लॉगिन करें' : 'किसान पोर्टल में लॉगिन करें'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-bold">या (Or)</span>
          </div>
        </div>

        {/* Key Feature: Continue as Guest Button */}
        <button
          onClick={handleGuestEntry}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-emerald-950 font-black text-xs sm:text-sm border-2 border-dashed border-emerald-400 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:scale-101 active:scale-99"
        >
          <span className="text-lg">👤</span>
          <span>बिना लॉगिन अतिथि के रूप में जारी रखें (Continue as Guest)</span>
        </button>

        {/* Quick Demo Pre-Fill Links for Reviewer Convenience */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-[11px]">1-Click Demo Fill:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuickFill('customer')}
              className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              Demo Buyer
            </button>
            <span>•</span>
            <button
              onClick={() => handleQuickFill('seller')}
              className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
            >
              Demo Farmer
            </button>
          </div>
        </div>

        {/* Bottom Trust Guarantee Badge */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Founded by Hemang Choudhary • 0% Dalali • 100% Direct Payouts</span>
        </div>
      </div>
    </div>
  );
};
