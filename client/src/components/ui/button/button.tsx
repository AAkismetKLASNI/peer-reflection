import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: Props) {
  return (
    <button {...props} className='backdrop-theme p-2 rounded-lg w-full'>
      {children}
    </button>
  );
}
