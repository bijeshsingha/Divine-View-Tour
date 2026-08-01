'use client';
import React from 'react';

export function Card({ 
  children, 
  className = '', 
  interactive = false,
  ...props 
}) {
  const baseStyles = 'bg-white border border-stone-100 rounded-2xl overflow-hidden';
  const interactiveStyles = interactive ? 'shadow-sm hover:shadow-md transition-shadow cursor-pointer' : 'shadow-sm';

  return (
    <div 
      className={`${baseStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
