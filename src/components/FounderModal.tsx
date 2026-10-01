import React from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { X, Award, Sparkles, CheckCircle2, Heart, Scale, Users, Wheat, ShieldCheck } from 'lucide-react';

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const FounderModal: React.FC<FounderModalProps> = ({ isOpen, onClose, currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-green-950 text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 font-black text-2xl flex items-center justify-center shadow-md">
              HC
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-lg">Hemang Choudhary</h3>
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Founder
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium">
                Founder & Chief Agricultural Visionary, KisanConnect
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Quote */}
          <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200/80">
            <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed italic">
              "When a farmer sweats in 45-degree heat to feed the nation, it is an injustice for intermediaries to pocket 40% of his rightful earnings. KisanConnect was built to give every single rupee back to our Annadata and deliver chemical-free nourishment to families."
            </p>
            <div className="mt-2 text-right text-xs font-black text-emerald-800">
              — Hemang Choudhary
            </div>
          </div>

          {/* Founder's Key Principles */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-slate-900 uppercase tracking-wider text-xs text-slate-500">
              Founding Principles of KisanConnect:
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">
                    Strict Zero Commission on Crops (0% Dalali)
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Neither listings nor sales are taxed with hidden commissions. Farmers retain 100% of their selling price.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">
                    Direct Farmer-Buyer Chat & Mutual Rating
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Transparent communication removes suspicion. Both farmers and buyers rate each transaction to build lasting trust across villages and cities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-xl bg-green-100 text-green-900 flex items-center justify-center shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">
                    Real-Time Cold-Chain Order Tracking
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    From morning field harvest to doorstep delivery, every stage is tracked with verification OTPs and GPS transit visibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">
                    Designed for Rural Accessibility
                  </h5>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Built with regional Indian languages, voice narration, and high-contrast touch controls so even elders in remote villages can manage their sales effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Direct Founder Desk:</span>
            <span className="font-mono text-emerald-800 font-bold">hemang@kisanconnect.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
