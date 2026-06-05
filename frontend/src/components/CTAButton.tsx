import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ children, className, ...props }) => {
  const navigate = useNavigate();
  return (
    <button
      {...props}
      className={className}
      onClick={(e) => {
        navigate('/contact#inquiry');
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {children}
    </button>
  );
};
