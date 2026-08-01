'use client';
import React from 'react';

export function Heading({ 
  children, 
  level = 2, 
  className = '', 
  ...props 
}) {
  const Tag = `h${level}`;
  
  // Base styles map standard responsive font sizes to heading levels
  const sizes = {
    1: 'text-3xl md:text-5xl font-extrabold mb-4 leading-tight',
    2: 'text-2xl md:text-3xl font-bold mb-4',
    3: 'text-xl font-bold mb-3',
    4: 'text-lg font-bold mb-2',
  };

  return (
    <Tag 
      className={`font-serif text-foreground ${sizes[level] || sizes[2]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Text({ 
  children, 
  variant = 'body', 
  className = '', 
  ...props 
}) {
  const variants = {
    body: 'text-stone-600 text-base',
    muted: 'text-stone-500 text-sm',
    lead: 'text-stone-700 text-lg',
  };

  return (
    <p 
      className={`font-sans ${variants[variant] || variants.body} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
