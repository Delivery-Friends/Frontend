import React, { MouseEventHandler, ReactNode } from 'react';

import classes from './button.module.scss';
interface ButtonProps {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  size?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, active, disabled, onClick, size }: ButtonProps) => {
  return (
    <button
      className={`${classes['custom-button']} ${
        active ? classes.selected : ''
      } ${size ? classes[size] : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
