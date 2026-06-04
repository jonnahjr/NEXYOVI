import React from 'react';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={className}
      onClick={(e) => {
        window.location.href = 'mailto:contact@nexyovi.com';
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    >
      {children}
    </button>
  );
};
