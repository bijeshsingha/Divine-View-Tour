'use client';
import React from 'react';
import { motion } from 'framer-motion';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1),_0px_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2),_0px_6px_12px_rgba(0,0,0,0.15)]',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1),_0px_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2),_0px_6px_12px_rgba(0,0,0,0.15)]',
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
    <motion.button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[appliedSize] || sizes.md} ${className}`}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
