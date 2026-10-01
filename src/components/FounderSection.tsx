import React from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  TrendingUp, 
  Quote, 
  Users, 
  Wheat,
  Scale
} from 'lucide-react';

interface FounderSectionProps {
  currentLang: Language;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang];

  return (
    <section id="founder" className="py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50/60 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Tag */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.founderHeading}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Revolutionizing Rural Agriculture with <span className="text-emerald-700">Zero-Middleman Tech</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal">
            {t.founderSub}
          </p>
        </div>

        {/* Founder Spotlight Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200/80 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
          {/* Decorative watermarks */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Founder Avatar / Profile Graphic */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-green-900 text-white font-black text-6xl flex items-center justify-center shadow-xl shadow-emerald-800/25 border-4 border-white">
                  HC
                </div>
                <div className="absolute -bottom-3 -right-2 bg-amber-400 text-emerald-950 font-black px-3 py-1 rounded-full text-xs shadow-md border-2 border-white flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Founder
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <h3 className="text-2xl font-black text-slate-900">
                  Hemang Choudhary
                </h3>
                <p className="text-xs font-bold text-emerald-700">
                  Founder & CEO, KisanConnect
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Championing Direct Farmer Economics & Grassroots Agritech
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Visionary Initiative</span>
              </div>
            </div>

            {/* Right: Founder's Story & Mission Pillars */}
            <div className="lg:col-span-8 space-y-6">
              {/* Quote Block */}
              <div className="relative bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200/70">
                <Quote className="w-8 h-8 text-emerald-400/60 absolute -top-3 -left-2" />
                <p className="text-sm sm:text-base text-emerald-950 font-medium leading-relaxed italic relative z-10 pl-4">
                  {t.founderQuote}
                </p>
                <div className="mt-3 text-right text-xs font-extrabold text-emerald-800">
                  — Hemang Choudhary, Founder
                </div>
              </div>

              {/* 4 Pillars of KisanConnect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Zero Middlemen (0% Dalali)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Traditional mandis deduct 20-40% from farmers in hidden fees. Hemang Choudhary built KisanConnect with a strict 0% commission guarantee.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    24-Hour Direct Bank Payout
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Immediate liquidity for seeds and fertilizers. Farmers receive 100% of order amounts directly in their verified bank account within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-green-100 text-green-900 flex items-center justify-center font-bold">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Farm Fresh for Every Household
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Produce is harvested same-day directly on the farm and dispatched with cold-chain protection without stale warehouse holding.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Accessible to Every Village
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Specifically engineered for rural Indian accessibility with 7 Indian languages, voice audio assistance, and large visual icon navigation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
