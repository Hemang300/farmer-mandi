import React, { useEffect, useState } from 'react';
import { Sprout, Award, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface SplashScreenProps {
  onComplete: () => void;
  currentLang: Language;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, currentLang }) => {
  const [progress, setProgress] = useState(0);
  const t = UI_TRANSLATIONS[currentLang];
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let completed = false;
    const triggerComplete = () => {
      if (!completed) {
        completed = true;
        onCompleteRef.current();
      }
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(triggerComplete, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    // Guaranteed fallback timeout so splash screen NEVER gets stuck
    const safetyTimer = setTimeout(() => {
      clearInterval(interval);
      triggerComplete();
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div 
      onClick={() => onCompleteRef.current()}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white overflow-hidden p-6 select-none cursor-pointer"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Splash Content Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full space-y-7 animate-in fade-in zoom-in-95 duration-700">
        {/* Animated Brand Logo Icon */}
        <div className="relative">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-400 to-emerald-500 flex items-center justify-center text-emerald-950 shadow-2xl shadow-emerald-900/60 border-4 border-emerald-400/40 transform hover:scale-105 transition-transform">
            <span className="text-6xl sm:text-7xl animate-bounce">🌾</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-700 border-2 border-white rounded-full p-2 text-white shadow-md">
            <Sprout className="w-5 h-5 text-amber-300" />
          </div>
        </div>

        {/* Titles & Tagline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black tracking-wider uppercase border border-amber-400/30">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Founded by Hemang Choudhary</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Kisan<span className="text-amber-400">Connect</span>
          </h1>

          <p className="text-emerald-200 text-sm sm:text-base font-semibold">
            {t.appTagline} • 0% Commission
          </p>

          <p className="text-xs text-emerald-300/80 font-medium">
            खेत से सीधे आपके घर, बिना बिचौलियों के ताज़ा उपज!
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full space-y-2 max-w-xs">
          <div className="flex justify-between text-xs text-emerald-200 font-bold">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Mandi loading...
            </span>
            <span className="font-mono">{progress}%</span>
          </div>

          <div className="h-2.5 w-full bg-emerald-950/80 rounded-full overflow-hidden p-0.5 border border-emerald-700/60 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip button for quick user entry */}
        <button
          onClick={onComplete}
          className="text-xs font-bold text-emerald-300 hover:text-amber-300 flex items-center gap-1 transition-colors pt-2 cursor-pointer opacity-80 hover:opacity-100"
        >
          <span>सीधे शुरू करें (Skip Intro)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Footer Credit */}
      <div className="absolute bottom-6 text-center text-[11px] text-emerald-400/80 font-medium">
        KisanConnect © 2026 • Dedicated to Indian Farmers & Families
      </div>
    </div>
  );
};
