import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackCtaClick } from '../lib/seo';

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
        trackCtaClick(
          typeof props['aria-label'] === 'string' ? props['aria-label'] : 'primary-cta',
          window.location.pathname,
        );
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
