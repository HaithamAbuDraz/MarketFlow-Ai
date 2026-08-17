import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  icon: Icon,
  error,
  helperText,
  className = '',
  inputClassName = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="font-['Inter'] font-medium text-xs sm:text-sm text-[#0f172a]">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <span className="absolute left-3.5 text-[#94a3b8] flex items-center justify-center pointer-events-none">
            <Icon size={17} />
          </span>
        )}

        <input
          id={id}
          name={name || id}
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full h-[42px] sm:h-[46px] text-xs sm:text-sm bg-white border rounded-[8px] text-[#0f172a] placeholder:text-[#94a3b8] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none transition-all ${
            Icon ? 'pl-10' : 'pl-3.5'
          } ${isPassword ? 'pr-10' : 'pr-3.5'} ${
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-[#e2e8f0] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20'
          } ${disabled ? 'bg-slate-50 opacity-75 cursor-not-allowed' : ''} ${inputClassName}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 text-[#94a3b8] hover:text-[#475569] transition-colors p-1 flex items-center justify-center cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error ? (
        <span className="text-rose-600 text-[11px] font-medium leading-none mt-0.5 animate-fade-in">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-[#64748b] text-[11px] leading-none mt-0.5">
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

export default InputField;
