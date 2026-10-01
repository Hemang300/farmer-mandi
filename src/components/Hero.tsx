import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  Store, 
  MessageSquare, 
  Truck, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Percent, 
  Sparkles,
  ArrowRight,
  PhoneCall,
  UserCheck
} from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onBrowseMarket: () => void;
  onOpenChat: () => void;
  onOpenTracking: () => void;
  onOpenFounderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onBrowseMarket,
  onOpenChat,
  onOpenTracking,
  onOpenFounderModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const t = UI_TRANSLATIONS[currentLang];

  // Speech synthesis for rural accessibility
  const handleToggleVoiceAssist = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToSpeak = `${t.heroTitlePrefix} ${t.heroTitleAccent} ${t.heroTitleSuffix}. ${t.heroDesc}. ${t.founderBadge}.`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      alert("Voice playback is supported directly on mobile and modern browsers.");
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Decorative background glow & rural motifs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Founder Honor Pill & Voice Helper Button */}
            <div className="flex flex-wrap items-center gap-3">
              <div 
                onClick={onOpenFounderModal}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-black px-3.5 py-1.5 rounded-full text-xs shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105 transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.founderBadge}</span>
                <span className="text-[10px] bg-emerald-950/20 px-1.5 py-0.5 rounded-full font-bold">
                  Vision
                </span>
              </div>

              {/* Rural Voice Narration Accessibility Button */}
              <button
                onClick={handleToggleVoiceAssist}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-rose-500/30 text-rose-200 border-rose-400 animate-pulse'
                    : 'bg-emerald-800/60 text-emerald-200 border-emerald-700 hover:bg-emerald-700/80'
                }`}
                title="Listen in Voice for Rural Users"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                    <span>आवाज़ रोकें (Stop Voice)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>🔊 बोल कर सुनें (Listen Voice)</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              {t.heroTitlePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 underline decoration-emerald-500/50 decoration-wavy decoration-2">
                {t.heroTitleAccent}
              </span>{' '}
              {t.heroTitleSuffix}
            </h1>

            {/* Description */}
            <p className="text-emerald-100/90 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-normal">
              {t.heroDesc}
            </p>

            {/* Rural-Friendly Action Buttons with Large Icons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBrowseMarket}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-emerald-950 font-black text-sm sm:text-base hover:from-amber-300 hover:to-yellow-300 transition-all shadow-xl shadow-amber-500/30 flex items-center gap-2.5 cursor-pointer hover:scale-102 active:scale-98"
              >
                <Store className="w-5 h-5 text-emerald-950" />
                <span>{t.browseMarketBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenChat}
                className="px-5 py-3.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700/80 text-white font-bold text-sm sm:text-base border border-emerald-600 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <MessageSquare className="w-5 h-5 text-amber-300" />
                <span>{t.directChatBtn}</span>
              </button>

              <button
                onClick={onOpenTracking}
                className="px-4 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-emerald-200 font-bold text-sm sm:text-base border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-5 h-5 text-emerald-400" />
                <span>{t.trackMyOrder}</span>
              </button>
            </div>

            {/* 3 Core Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-800/60 max-w-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">0% Dalali</div>
                  <div className="text-[10px] text-emerald-300 font-medium">Zero Commission</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-300 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">100% Verified</div>
                  <div className="text-[10px] text-emerald-300 font-medium">KYC Farmers</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">Live Tracking</div>
                  <div className="text-[10px] text-emerald-300 font-medium">Farm to Door</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Interactive Live Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Founder quote bubble */}
              <div className="bg-gradient-to-br from-emerald-800/90 to-emerald-900/95 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-emerald-700/60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 font-black text-xl flex items-center justify-center shadow-md">
                      HC
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-white">
                        Hemang Choudhary
                      </h4>
                      <p className="text-xs text-amber-300 font-semibold">
                        Founder & Rural Tech Evangelist
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-700/80 text-[10px] font-bold text-emerald-200 border border-emerald-500/30">
                    Official
                  </span>
                </div>

                <div className="py-4 space-y-3">
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed italic">
                    {t.founderQuote}
                  </p>

                  <div className="bg-emerald-950/70 p-3.5 rounded-2xl border border-emerald-700/50 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-medium">Direct Farmer Bank Payout:</span>
                      <span className="font-extrabold text-emerald-200">100% in 24 Hrs</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-medium">Middlemen Cut:</span>
                      <span className="font-extrabold text-rose-400 line-through">25% - 40%</span>
                      <span className="font-extrabold text-emerald-300">0% on KisanConnect</span>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Direct Chat Trigger */}
                <div className="pt-3 border-t border-emerald-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-semibold text-emerald-200">
                      15,240+ Farmers Online Now
                    </span>
                  </div>
                  <button
                    onClick={onOpenChat}
                    className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                  >
                    Try Chat <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
