import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

export default function Button({
  children,
  className,
  size = 'medium',
  type = 'button',
  ...rest
}: ButtonProps) {
  const baseClassName = 'btn';

  const sizeClasses = clsx({
    'px-3 py-1 text-xs': size === 'small',
    'px-4 py-2 text-sm': size === 'medium',
    'px-6 py-3 text-base': size === 'large',
    'px-8 py-4 text-lg': size === 'xlarge',
  });

  const buttonProps = { ...rest, type };

  const combinedClassName = clsx(baseClassName, sizeClasses, className);

  return (
    <button className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
