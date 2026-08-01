'use client';
import React from 'react';

export function Badge({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider';
  
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    warning: 'bg-red-500 text-white shadow-sm border border-red-400',
    outline: 'bg-transparent border border-stone-300 text-stone-600',
    glass: 'bg-foreground/80 backdrop-blur-md text-secondary border border-secondary/30 shadow-sm',
  };

  return (
    <span 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
