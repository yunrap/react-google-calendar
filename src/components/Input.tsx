import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ className = '', type = 'text', ...rest }) => {
  const combinedClassName = `custom-input ${className}`.trim();

  return <input type={type} className={combinedClassName} {...rest} />;
};

export default Input;
