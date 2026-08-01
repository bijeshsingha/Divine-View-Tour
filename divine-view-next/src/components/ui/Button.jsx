'use client';
import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg',
    outline: 'bg-white border-2 border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-stone-300',
    ghost: 'bg-transparent text-stone-600 hover:bg-stone-100',
    icon: 'bg-white/20 backdrop-blur-md text-white hover:bg-white/40 rounded-full',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    icon: 'w-10 h-10 rounded-full',
  };

  // If variant is icon, default size to icon unless overridden
  const appliedSize = (variant === 'icon' && size === 'md') ? 'icon' : size;

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[appliedSize] || sizes.md} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
