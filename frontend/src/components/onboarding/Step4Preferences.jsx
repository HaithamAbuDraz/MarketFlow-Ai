import React from 'react';
import { ArrowRight, ChevronDown, AlertCircle, Loader2 } from 'lucide-react';

const LANGUAGES = [
  { code: 'en-US', name: 'English (United States)' },
  { code: 'en-GB', name: 'English (United Kingdom)' },
  { code: 'ar-SA', name: 'Arabic (العربية)' },
  { code: 'fr-FR', name: 'French (Français)' },
  { code: 'es-ES', name: 'Spanish (Español)' },
  { code: 'de-DE', name: 'German (Deutsch)' },
  { code: 'tr-TR', name: 'Turkish (Türkçe)' },
];

const CURRENCIES = [
  { code: 'USD', name: 'USD - US Dollar ($)' },
  { code: 'EUR', name: 'EUR - Euro (€)' },
  { code: 'GBP', name: 'GBP - British Pound (£)' },
  { code: 'SAR', name: 'SAR - Saudi Riyal (ر.س)' },
  { code: 'AED', name: 'AED - UAE Dirham (د.إ)' },
  { code: 'KWD', name: 'KWD - Kuwaiti Dinar (د.ك)' },
  { code: 'CAD', name: 'CAD - Canadian Dollar ($)' },
  { code: 'AUD', name: 'AUD - Australian Dollar ($)' },
];

const TIMEZONES = [
  { value: 'UTC+00:00', name: '(UTC+00:00) UTC Universal Time / London' },
  { value: 'UTC+03:00', name: '(UTC+03:00) Riyadh, Kuwait, Doha, Baghdad' },
  { value: 'UTC+04:00', name: '(UTC+04:00) Dubai, Abu Dhabi, Muscat' },
  { value: 'UTC+02:00', name: '(UTC+02:00) Cairo, Jerusalem, Athens, Beirut' },
  { value: 'UTC+01:00', name: '(UTC+01:00) Paris, Berlin, Rome, Madrid' },
  { value: 'UTC-05:00', name: '(UTC-05:00) Eastern Time (US & Canada)' },
  { value: 'UTC-08:00', name: '(UTC-08:00) Pacific Time (US & Canada)' },
];

const MEASUREMENT_SYSTEMS = [
  { value: 'metric-dmy', name: 'Metric (kg, cm) • DD/MM/YYYY' },
  { value: 'metric-mdy', name: 'Metric (kg, cm) • MM/DD/YYYY' },
  { value: 'imperial-mdy', name: 'Imperial (lb, in) • MM/DD/YYYY' },
];

export const Step4Preferences = ({
  data,
  onChange,
  onNext,
  onBack,
  isLoading,
  error,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          Set your store preferences
        </h2>
        <p className="text-sm sm:text-[16px] text-[#475569] dark:text-slate-400 leading-relaxed">
          Choose a few preferences to personalize how your store works.
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
        {/* Field: Store Language */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="store-language-select"
            className="text-sm font-semibold text-[#0f1b2d] dark:text-slate-200"
          >
            Store Language
          </label>
          <div className="relative">
            <select
              id="store-language-select"
              value={data.language || 'en-US'}
              onChange={(e) => onChange({ ...data, language: e.target.value })}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-[#d1d5db] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] text-[15px] text-[#0f172a] dark:text-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-[#9ca3af] dark:text-slate-500">
                Select language
              </option>
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="dark:bg-[#0c1836] dark:text-white">
                  {lang.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Field: Currency */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="store-currency-select"
            className="text-sm font-semibold text-[#0f1b2d] dark:text-slate-200"
          >
            Currency
          </label>
          <div className="relative">
            <select
              id="store-currency-select"
              value={data.currency || 'USD'}
              onChange={(e) => onChange({ ...data, currency: e.target.value })}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-[#d1d5db] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] text-[15px] text-[#0f172a] dark:text-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-[#9ca3af] dark:text-slate-500">
                Select currency
              </option>
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="dark:bg-[#0c1836] dark:text-white">
                  {c.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Field: Time Zone */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="store-timezone-select"
            className="text-sm font-semibold text-[#0f1b2d] dark:text-slate-200"
          >
            Time Zone
          </label>
          <div className="relative">
            <select
              id="store-timezone-select"
              value={data.timeZone || 'UTC+03:00'}
              onChange={(e) => onChange({ ...data, timeZone: e.target.value })}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-[#d1d5db] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] text-[15px] text-[#0f172a] dark:text-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-[#9ca3af] dark:text-slate-500">
                Select time zone
              </option>
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value} className="dark:bg-[#0c1836] dark:text-white">
                  {tz.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Field: Measurement & Unit System */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="store-units-select"
            className="text-sm font-semibold text-[#0f1b2d] dark:text-slate-200"
          >
            Unit System &amp; Date Format
          </label>
          <div className="relative">
            <select
              id="store-units-select"
              value={data.unitSystem || 'metric-dmy'}
              onChange={(e) => onChange({ ...data, unitSystem: e.target.value })}
              className="w-full h-12 px-4 pr-10 rounded-[10px] border border-[#d1d5db] dark:border-[#1e3a75] bg-white dark:bg-[#0c1836] text-[15px] text-[#0f172a] dark:text-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all appearance-none cursor-pointer"
            >
              {MEASUREMENT_SYSTEMS.map((u) => (
                <option key={u.value} value={u.value} className="dark:bg-[#0c1836] dark:text-white">
                  {u.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex gap-3 sm:gap-4 items-center w-full pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="h-12 px-6 rounded-lg border border-[#e2e8f0] dark:border-[#1e3a75] hover:bg-slate-50 dark:hover:bg-[#122244] disabled:opacity-50 text-[#475569] dark:text-slate-300 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-12 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-75 active:scale-[0.99] text-white font-semibold text-sm sm:text-base rounded-lg shadow-[0px_4px_6px_rgba(37,99,235,0.25)] hover:shadow-[0px_6px_12px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving Preferences...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Step4Preferences;
