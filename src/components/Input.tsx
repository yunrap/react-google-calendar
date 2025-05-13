import React from 'react';
import '../styles/components/Input.scss'; // We will create this SCSS file next

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = '', type = 'text', ...rest }) => {
  const baseClassName = 'custom-input';
  const combinedClassName = `${baseClassName} ${className}`.trim();

  return <input type={type} className={combinedClassName} {...rest} />;
};

export default Input;
