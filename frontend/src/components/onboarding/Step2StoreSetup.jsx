import React, { useRef } from 'react';
import { ArrowRight, Check, UploadCloud, X, AlertCircle } from 'lucide-react';
import uploadIconSvg from '@/assets/onboarding/upload-icon.svg';
import themeMinimalImg from '@/assets/onboarding/theme-minimal.png';
import themeModernImg from '@/assets/onboarding/theme-modern.png';
import themeElegantImg from '@/assets/onboarding/theme-elegant.png';

const THEMES = [
  {
    id: 'minimal',
    name: 'Minimal',
    img: themeMinimalImg,
    description: 'Clean, typography-focused, whitespace balance',
  },
  {
    id: 'modern',
    name: 'Modern',
    img: themeModernImg,
    description: 'Vibrant, high-conversion, dynamic product cards',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    img: themeElegantImg,
    description: 'Dark-mode luxury, gold accents, premium boutique',
  },
];

export const Step2StoreSetup = ({
  data,
  onChange,
  onNext,
  onBack,
  error,
}) => {
  const fileInputRef = useRef(null);

  const handleNameChange = (e) => {
    const val = e.target.value;
    // If slug hasn't been manually edited or is matching previous slug, auto-update slug
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '');
    
    onChange({
      ...data,
      storeName: val,
      storeSlug: data.isSlugManual ? data.storeSlug : generatedSlug,
    });
  };

  const handleSlugChange = (e) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    onChange({
      ...data,
      storeSlug: val,
      isSlugManual: true,
    });
  };

  const handleLogoUpload = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size must be under 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...data,
        storeLogo: event.target.result,
        storeLogoFile: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = (e) => {
    e.stopPropagation();
    onChange({
      ...data,
      storeLogo: null,
      storeLogoFile: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.storeName?.trim()) {
      return;
    }
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[560px] bg-white dark:bg-[#091530] rounded-[20px] p-6 sm:p-10 drop-shadow-[0px_8px_16px_rgba(15,23,42,0.06)] border border-[#e2e8f0]/80 dark:border-[#173066] flex flex-col gap-8 animate-modal-in transition-colors duration-200"
    >
      {/* Form Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] dark:text-white leading-tight">
          Tell us about your store
        </h2>
        <p className="text-sm sm:text-[16px] text-[#475569] dark:text-slate-400 leading-relaxed">
          We just need a few details to get your store set up.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-rose-950/60 border border-red-200 dark:border-rose-500/30 rounded-lg text-red-700 dark:text-rose-300 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Fields Stack */}
      <div className="flex flex-col gap-4">
        {/* Field: Store Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="store-name-input"
            className="text-sm font-medium text-[#0f172a] dark:text-slate-200"
          >
            Store Name <span className="text-red-500">*</span>
          </label>
          <input
            id="store-name-input"
            type="text"
            required
            value={data.storeName || ''}
            onChange={handleNameChange}
            placeholder="e.g. Apex Apparel, Craft & Co."
            className="w-full h-12 px-4 rounded-[10px] border border-[#e2e8f0] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] text-[15px] text-[#0f172a] dark:text-white placeholder-[#94a3b8] dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all"
          />
        </div>

        {/* Field: Store URL */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="store-url-input"
            className="text-sm font-medium text-[#0f172a] dark:text-slate-200"
          >
            Store URL
          </label>
          <div className="w-full h-12 rounded-[10px] border border-[#e2e8f0] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] flex items-center overflow-hidden focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30 transition-all">
            <input
              id="store-url-input"
              type="text"
              value={data.storeSlug || ''}
              onChange={handleSlugChange}
              placeholder="myawesomestore"
              className="flex-1 h-full pl-4 pr-2 bg-transparent text-[15px] text-[#0f172a] dark:text-white placeholder-[#94a3b8] dark:placeholder:text-slate-500 focus:outline-none"
            />
            <div className="h-full px-4 bg-[#f1f5f9] dark:bg-[#132347] border-l border-[#e2e8f0] dark:border-[#1e3a75] text-[#64748b] dark:text-slate-300 text-sm font-medium flex items-center select-none shrink-0">
              .marketflow.ai
            </div>
          </div>
        </div>

        {/* Field: Store Logo (optional) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#0f172a] dark:text-slate-200">
            Store Logo <span className="text-[#64748b] dark:text-slate-400 font-normal text-xs">(optional)</span>
          </label>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => handleLogoUpload(e.target.files[0])}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleLogoUpload(e.dataTransfer.files[0]);
            }}
            className="w-full min-h-[96px] p-4 rounded-[10px] border border-dashed border-[#e2e8f0] dark:border-[#1e3a75] hover:border-[#2563eb] dark:hover:border-blue-400 bg-white dark:bg-[#0c1836] hover:bg-blue-50/30 dark:hover:bg-[#12244a]/50 flex items-center gap-4 transition-all duration-150 cursor-pointer group"
          >
            {data.storeLogo ? (
              <div className="relative w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 group/img">
                <img
                  src={data.storeLogo}
                  alt="Store Logo Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition cursor-pointer"
                  title="Remove logo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-[rgba(37,99,235,0.08)] dark:bg-blue-900/30 group-hover:bg-[rgba(37,99,235,0.15)] flex items-center justify-center shrink-0 transition-colors">
                <img src={uploadIconSvg} alt="Upload Logo" className="w-6 h-6 object-contain" />
              </div>
            )}

            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-sm font-medium text-[#2563eb] dark:text-[#38bdf8] group-hover:underline">
                {data.storeLogo ? 'Change store logo' : 'Upload store logo'}
              </span>
              <span className="text-xs text-[#64748b] dark:text-slate-400">
                Supports PNG, JPG, or WEBP up to 2MB. Recommended 512×512px.
              </span>
            </div>
          </div>
        </div>

        {/* Field: Store Theme */}
        <div className="flex flex-col gap-2.5 pt-1">
          <label className="text-sm font-medium text-[#0f172a] dark:text-slate-200">
            Store Theme
          </label>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full">
            {THEMES.map((th) => {
              const isSelected = (data.theme || 'modern') === th.id;

              return (
                <div
                  key={th.id}
                  onClick={() => onChange({ ...data, theme: th.id })}
                  className={`relative rounded-[10px] overflow-hidden border cursor-pointer transition-all duration-200 flex flex-col ${
                    isSelected
                      ? 'border-2 border-[#2563eb] shadow-[0px_4px_12px_rgba(37,99,235,0.15)] scale-[1.02]'
                      : 'border-[#e2e8f0] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] hover:border-slate-300 dark:hover:border-blue-400'
                  }`}
                >
                  {/* Theme Thumbnail */}
                  <div className="h-20 w-full relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={th.img}
                      alt={th.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Theme Label */}
                  <div
                    className={`p-2.5 sm:p-3 text-center sm:text-left transition-colors ${
                      isSelected
                        ? 'bg-[rgba(37,99,235,0.06)] dark:bg-blue-900/30'
                        : 'bg-white dark:bg-[#0c1836]'
                    }`}
                  >
                    <p
                      className={`text-xs sm:text-[13px] font-semibold ${
                        isSelected ? 'text-[#2563eb] dark:text-[#38bdf8]' : 'text-[#0f172a] dark:text-slate-200'
                      }`}
                    >
                      {th.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex gap-3 sm:gap-4 items-center w-full pt-2">
        <button
          type="button"
          onClick={onBack}
          className="h-12 px-6 rounded-lg border border-[#e2e8f0] dark:border-[#1e3a75] hover:bg-slate-50 dark:hover:bg-[#122244] text-[#475569] dark:text-slate-300 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={!data.storeName?.trim()}
          className="flex-1 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-50 active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-lg shadow-[0px_4px_6px_rgba(37,99,235,0.25)] hover:shadow-[0px_6px_12px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};

export default Step2StoreSetup;
