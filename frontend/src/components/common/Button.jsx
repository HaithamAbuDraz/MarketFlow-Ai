import React from 'react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  loadingText = 'Processing...',
  icon: Icon,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[8px] transition-all duration-150 cursor-pointer select-none disabled:opacity-65 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'h-[38px] px-3.5 text-xs',
    md: 'h-[44px] sm:h-[46px] px-4 text-xs sm:text-sm',
    lg: 'h-[48px] sm:h-[50px] px-5 text-sm sm:text-base',
  };

  const variantStyles = {
    primary: 'bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-white shadow-[0px_4px_6px_rgba(37,99,235,0.24)] hover:shadow-[0px_6px_12px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-[#091530] hover:bg-[#112450] text-white border border-[#1d448c]/60 shadow-sm',
    outline: 'bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0f172a] border border-[#e2e8f0] hover:border-slate-300 shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-[#475569] hover:text-[#0f172a]',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
          <span>{loadingText}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="shrink-0" />}
          <span>{children}</span>
        </div>
      )}
    </button>
  );
};

export default Button;
