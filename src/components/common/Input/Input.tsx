import React, { forwardRef } from 'react';
import classes from './input.module.scss';

interface InputProps {
  input: {
    id: string;
    type?: string;
    onChange?: () => void;
    placeholder?: string;
    error?: string;
  };
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ input, label }, ref) => {
    return (
      <div className={classes['custom-input']}>
        <input
          className={`${input.error ? classes.error : ''}`}
          placeholder=" "
          id={input.id}
          type={input.type || 'text'}
          ref={ref}
          onChange={input.onChange}
        />
        <label htmlFor={input.id}>{label}</label>
        {input.error && <p>{input.error}</p>}
      </div>
    );
  }
);

export default React.memo(Input);
