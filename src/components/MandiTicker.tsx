import React from 'react';
import { MandiRate } from '../types';
import { TrendingUp, TrendingDown, Store } from 'lucide-react';

interface MandiTickerProps {
  rates: MandiRate[];
  languageLabel: string;
}

export const MandiTicker: React.FC<MandiTickerProps> = ({ rates, languageLabel }) => {
  return (
    <div className="bg-emerald-900 text-white text-xs py-2 px-4 overflow-hidden border-b border-emerald-800">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold text-amber-300 shrink-0 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-amber-400/30">
          <Store className="w-3.5 h-3.5" />
          <span>{languageLabel}</span>
        </div>

        <div className="relative overflow-hidden w-full whitespace-nowrap group">
          <div className="inline-flex gap-6 animate-marquee py-0.5">
            {rates.concat(rates).map((rate, idx) => (
              <div
                key={`${rate.id}-${idx}`}
                className="inline-flex items-center gap-2 bg-emerald-800/60 px-3 py-1 rounded-md border border-emerald-700/50 hover:bg-emerald-700/80 transition-colors"
              >
                <span className="font-semibold text-slate-100">{rate.crop}</span>
                <span className="text-emerald-300 text-[11px]">({rate.mandi})</span>
                <span className="font-bold text-white">₹{rate.pricePerQuintal.toLocaleString('en-IN')}/q</span>
                <span
                  className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    rate.trend === 'up'
                      ? 'text-emerald-200 bg-emerald-700/80'
                      : 'text-rose-200 bg-rose-900/80'
                  }`}
                >
                  {rate.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {rate.change > 0 ? `+${rate.change}%` : `${rate.change}%`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
