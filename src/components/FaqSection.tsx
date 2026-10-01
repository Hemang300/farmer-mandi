import React, { useState } from 'react';
import { FaqItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  UserCheck, 
  Tractor, 
  Award, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  currentLang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'customer' | 'farmer'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']); // Keep first open by default

  const t = UI_TRANSLATIONS[currentLang];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    // Role filter
    if (activeCategory !== 'all' && faq.targetRole !== 'all' && faq.targetRole !== activeCategory) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const questionText = (faq.question[currentLang] || faq.question.en).toLowerCase();
      const answerText = (faq.answer[currentLang] || faq.answer.en).toLowerCase();
      const cat = faq.category.toLowerCase();
      return questionText.includes(q) || answerText.includes(q) || cat.includes(q);
    }

    return true;
  });

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faqTitle}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Transparent Guidance for <span className="text-emerald-700">Buyers & Farmers</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
            {t.faqSub}
          </p>

          {/* Search Bar for FAQ */}
          <div className="pt-3 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. commission, payment, quality)..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveCategory('customer')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'customer'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.customerFaq}</span>
          </button>
          <button
            onClick={() => setActiveCategory('farmer')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'farmer'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Tractor className="w-3.5 h-3.5" />
            <span>{t.farmerFaq}</span>
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const question = faq.question[currentLang] || faq.question.en;
              const answer = faq.answer[currentLang] || faq.answer.en;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-emerald-300 shadow-md ring-1 ring-emerald-100'
                      : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          faq.targetRole === 'farmer'
                            ? 'bg-amber-100 text-amber-900'
                            : faq.targetRole === 'customer'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {faq.category}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">
                        {question}
                      </h4>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                        isOpen
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 animate-in slide-in-from-top-1">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white p-8 rounded-2xl text-center border border-slate-200">
              <p className="text-sm font-bold text-slate-600">
                No matching questions found for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-bold text-emerald-700 underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Need more help banner */}
        <div className="mt-10 bg-gradient-to-r from-emerald-800 to-green-800 text-white rounded-3xl p-6 text-center shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-extrabold text-base">Have more specific Mandi questions?</h4>
            <p className="text-xs text-emerald-200">
              Our rural Kisan sahayata team is available 24/7 in Hindi, English & regional dialects.
            </p>
          </div>
          <a
            href="tel:18001801551"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs rounded-xl shadow-md flex items-center gap-2 shrink-0 transition-transform hover:scale-102"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Kisan Sahayata: 1800-KISAN</span>
          </a>
        </div>
      </div>
    </section>
  );
};
