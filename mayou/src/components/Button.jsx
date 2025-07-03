// src/components/Button.jsx

import React from 'react';

export default function Button({
  children,
  type = 'button',       // ← valeur par défaut
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseClass = variant === 'ghost'
    ? 'btn-ghost'
    : 'btn-primary';

  return (
    <button
      type={type}                   // ← on applique la prop type
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
