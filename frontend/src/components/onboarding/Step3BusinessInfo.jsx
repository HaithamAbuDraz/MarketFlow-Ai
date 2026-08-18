import React from 'react';
import { ArrowRight, ChevronDown, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Fashion & Apparel',
  'Electronics & Technology',
  'Health & Beauty',
  'Home, Furniture & Living',
  'Food & Beverage',
  'Sports & Outdoor',
  'Jewelry & Luxury Goods',
  'Digital Products & Services',
  'Books, Toys & Hobbies',
  'Automotive & Industrial',
  'Other / General Merchandise',
];

const BUSINESS_TYPES = [
  'Online Store (Direct-to-Consumer)',
  'Retail Store (Physical Shop)',
  'Wholesale / B2B Distribution',
  'Marketplace / Multi-Vendor',
  'Dropshipping & Print-on-Demand',
  'Omnichannel / Hybrid',
];

export const Step3BusinessInfo = ({
  data,
  onChange,
  onNext,
  onBack,
  error,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.businessCategory) {
      return;
    }
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[560px] bg-white rounded-[20px] p-6 sm:p-10 drop-shadow-[0px_8px_16px_rgba(15,23,42,0.06)] border border-[#e2e8f0]/80 flex flex-col gap-8 animate-modal-in"
    >
      {/* Form Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] leading-tight">
          Tell us about your business
        </h2>
        <p className="text-sm sm:text-[16px] text-[#475569] leading-relaxed">
          Help us understand your business so we can personalize your experience.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Fields Stack */}
      <div className="flex flex-col gap-4">
        {/* Field: Business Category * */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="business-category-select"
            className="text-sm font-semibold text-[#0f1b2d] flex items-center gap-1"
          >
            <span>Business Category</span>
            <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative">
            <select
              id="business-category-select"
              required
              value={data.businessCategory || ''}
              onChange={(e) => onChange({ ...data, businessCategory: e.target.value })}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-[#d1d5db] bg-white text-[15px] text-[#0f172a] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-[#9ca3af]">
                Select a category
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Field: Business Description (optional) */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="business-description-input"
            className="text-sm font-semibold text-[#0f1b2d]"
          >
            Business Description <span className="text-[#64748b] font-normal text-xs">(optional)</span>
          </label>
          <textarea
            id="business-description-input"
            rows={4}
            value={data.businessDescription || ''}
            onChange={(e) => onChange({ ...data, businessDescription: e.target.value })}
            placeholder="Describe what your business sells or offers..."
            className="w-full h-[120px] p-4 rounded-[10px] border border-[#d1d5db] bg-white text-[15px] text-[#0f172a] placeholder-[#9ca3af] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all resize-none leading-normal"
          />
        </div>

        {/* Field: Business Type (optional) */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="business-type-select"
            className="text-sm font-semibold text-[#0f1b2d]"
          >
            Business Type <span className="text-[#64748b] font-normal text-xs">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="business-type-select"
              value={data.businessType || ''}
              onChange={(e) => onChange({ ...data, businessType: e.target.value })}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-[#d1d5db] bg-white text-[15px] text-[#0f172a] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
            >
              <option value="" className="text-[#9ca3af]">
                e.g. Online Store, Retail, Wholesale
              </option>
              {BUSINESS_TYPES.map((bt) => (
                <option key={bt} value={bt}>
                  {bt}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Field: Target Audience (optional) */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="target-audience-input"
            className="text-sm font-semibold text-[#0f1b2d]"
          >
            Target Audience <span className="text-[#64748b] font-normal text-xs">(optional)</span>
          </label>
          <input
            id="target-audience-input"
            type="text"
            value={data.targetAudience || ''}
            onChange={(e) => onChange({ ...data, targetAudience: e.target.value })}
            placeholder="Describe your main customers"
            className="w-full h-12 px-4 rounded-[10px] border border-[#d1d5db] bg-white text-[15px] text-[#0f172a] placeholder-[#9ca3af] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex gap-3 sm:gap-4 items-center w-full pt-2">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-6 rounded-lg border border-[#e2e8f0] hover:bg-slate-50 text-[#475569] font-semibold text-sm sm:text-base transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={!data.businessCategory}
          className="flex-1 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-lg shadow-[0px_4px_6px_rgba(37,99,235,0.25)] hover:shadow-[0px_6px_12px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};

export default Step3BusinessInfo;
