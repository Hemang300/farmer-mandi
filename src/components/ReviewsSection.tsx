import React, { useState } from 'react';
import { ReviewItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  PlusCircle, 
  MessageSquare, 
  Filter, 
  ShieldCheck, 
  Sparkles,
  Tractor,
  UserCheck,
  X
} from 'lucide-react';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  currentLang: Language;
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  currentLang,
  onAddReview,
}) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'farmer'>('customer');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form states for writing a review
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<'customer' | 'farmer'>('customer');
  const [formTarget, setFormTarget] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formLocation, setFormLocation] = useState('');
  const [formComment, setFormComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const t = UI_TRANSLATIONS[currentLang];

  const availableTags = [
    '100% Farm Fresh',
    'Fair Mandi Rate',
    'Zero Middlemen',
    '24hr Bank Transfer',
    'Certified Organic',
    'Polite Communication',
    'Protective Packaging',
    'Same Day Pickup',
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredReviews = reviews.filter((r) => {
    if (r.role !== activeTab) return false;
    if (ratingFilter !== 'all' && r.rating !== ratingFilter) return false;
    return true;
  });

  const currentTabReviews = reviews.filter((r) => r.role === activeTab);
  const avgRating =
    currentTabReviews.length > 0
      ? (
          currentTabReviews.reduce((sum, r) => sum + r.rating, 0) /
          currentTabReviews.length
        ).toFixed(1)
      : '4.9';

  const handleHelpfulClick = (id: string) => {
    // Increment helpful count in local review list
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      alert('Please fill your name and feedback comment.');
      return;
    }

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      authorName: formName.trim(),
      role: formRole,
      targetName: formTarget.trim() || (formRole === 'customer' ? 'Verified Farmer' : 'Direct Buyers Network'),
      rating: formRating,
      date: 'Just now',
      comment: formComment.trim(),
      verified: true,
      avatarInitial: formName.trim().charAt(0).toUpperCase(),
      location: formLocation.trim() || 'India',
      tags: selectedTags.length > 0 ? selectedTags : ['Verified Transaction'],
      helpfulCount: 1,
    };

    onAddReview(newRev);
    setIsWriteModalOpen(false);
    // Reset form
    setFormName('');
    setFormComment('');
    setFormTarget('');
    setFormLocation('');
    setSelectedTags([]);
  };

  const getRatingFeedbackLabel = (stars: number) => {
    switch (stars) {
      case 5:
        return 'उत्कृष्ट (Superb / Bumper Quality)';
      case 4:
        return 'बहुत बढ़िया (Very Good)';
      case 3:
        return 'अच्छा (Satisfactory)';
      case 2:
        return 'औसत (Average)';
      case 1:
        return 'असंतोषजनक (Needs Improvement)';
      default:
        return '';
    }
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.navReviews}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Honest Feedback from{' '}
              <span className="text-emerald-700">Both Farmers & Buyers</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-normal">
              A transparent, two-way rating system ensuring mutual respect, fair compensation for crops, and unmatched produce quality.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-700/20 flex items-center gap-2 cursor-pointer self-start md:self-end hover:scale-102 active:scale-98 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.writeReviewBtn}</span>
          </button>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-100 rounded-3xl mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('customer');
                setRatingFilter('all');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.customerReviewsTab}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
                4.8 ★
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('farmer');
                setRatingFilter('all');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'farmer'
                  ? 'bg-white text-emerald-900 shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tractor className="w-4 h-4 text-amber-600" />
              <span>{t.farmerReviewsTab}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black">
                4.9 ★
              </span>
            </button>
          </div>

          {/* Star Filter Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold text-slate-600">
            <span className="text-[11px] text-slate-400 font-bold uppercase hidden sm:inline mr-1">
              Filter:
            </span>
            <button
              onClick={() => setRatingFilter('all')}
              className={`px-2.5 py-1 rounded-xl cursor-pointer transition-colors ${
                ratingFilter === 'all'
                  ? 'bg-emerald-700 text-white font-black'
                  : 'bg-white hover:bg-slate-200 text-slate-700'
              }`}
            >
              All
            </button>
            {[5, 4, 3].map((star) => (
              <button
                key={star}
                onClick={() => setRatingFilter(star)}
                className={`px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer transition-colors ${
                  ratingFilter === star
                    ? 'bg-emerald-700 text-white font-black'
                    : 'bg-white hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{star}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Rating Overview Summary Banner */}
        <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100/50 rounded-3xl p-6 sm:p-8 mb-8 border border-emerald-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-emerald-200 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-emerald-950">{avgRating}</span>
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black text-emerald-950">
                {activeTab === 'customer' ? 'Customer Satisfaction' : 'Farmer Economic Upliftment'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md">
                {activeTab === 'customer'
                  ? 'Over 98% of buyers report produce is significantly fresher and tastier than standard supermarket and local cart goods.'
                  : 'Farmers earn up to 40% higher realization compared to traditional wholesale mandis with zero deductions for handling.'}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/90 p-3 rounded-2xl border border-emerald-200 text-center">
              <div className="text-xl font-black text-emerald-900">100%</div>
              <div className="text-[11px] font-bold text-slate-500">Verified Orders</div>
            </div>
            <div className="bg-white/90 p-3 rounded-2xl border border-emerald-200 text-center">
              <div className="text-xl font-black text-emerald-900">24 Hrs</div>
              <div className="text-[11px] font-bold text-slate-500">Payment Payout</div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Location & Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shadow-sm ${
                        review.role === 'customer'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {review.avatarInitial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-sm text-slate-900">
                          {review.authorName}
                        </h4>
                        {review.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {review.location} • {review.date}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-xl border border-amber-200/50">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-black text-amber-900">{review.rating}.0</span>
                  </div>
                </div>

                {/* Target context (e.g. for which product or farmer) */}
                <div className="bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 mb-3 flex items-center gap-1.5 border border-slate-100">
                  <span className="text-slate-400 font-normal">Regarding:</span>
                  <span className="text-emerald-800 font-bold truncate">
                    {review.targetName}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                  "{review.comment}"
                </p>

                {/* Tags */}
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {review.tags.map((tg, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200/60"
                      >
                        #{tg}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Helpful Upvote */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px]">Verified Direct Transaction</span>
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  className="flex items-center gap-1 text-slate-500 hover:text-emerald-700 font-semibold cursor-pointer transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({review.helpfulCount || 12})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border border-slate-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-extrabold text-base sm:text-lg">
                  {t.writeReviewBtn}
                </h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmitReview} className="p-5 space-y-4">
              {/* Role Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  I am submitting this review as:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormRole('customer')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formRole === 'customer'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-400 font-black'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Customer (Buyer)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormRole('farmer')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      formRole === 'farmer'
                        ? 'bg-amber-50 text-amber-900 border-amber-400 font-black'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <Tractor className="w-3.5 h-3.5 text-amber-600" />
                    <span>Farmer (Seller)</span>
                  </button>
                </div>
              </div>

              {/* Interactive Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Rating (1 to 5 Stars):
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= formRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-emerald-800 ml-2">
                    {getRatingFeedbackLabel(formRating)}
                  </span>
                </div>
              </div>

              {/* Name & Location Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / State *
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Target / Reference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {formRole === 'customer'
                    ? 'Farmer Name / Crop Reviewed'
                    : 'Customer / Mandi Reference'}
                </label>
                <input
                  type="text"
                  value={formTarget}
                  onChange={(e) => setFormTarget(e.target.value)}
                  placeholder={
                    formRole === 'customer'
                      ? 'e.g. Sardar Gurpreet Singh (Wheat)'
                      : 'e.g. Society Bulk Buyers (Delhi)'
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Detailed Comment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Detailed Review / Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Share your experience regarding crop quality, taste, freshness, prompt payment, or communication..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-normal"
                />
              </div>

              {/* Tag Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Applicable Tags:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        selectedTags.includes(tag)
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {selectedTags.includes(tag) ? '✓ ' : '+ '}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Submit Review & Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
