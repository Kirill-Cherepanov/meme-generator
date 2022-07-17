import React from 'react';
import './StyledButton.scss';

const STYLES = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  option: 'btn--option'
};

const SIZES = {
  S: 'btn--small',
  M: 'btn--medium',
  L: 'btn--large'
};

export default function StyledButton({
  children,
  className,
  buttonStyle,
  buttonSize,
  clickHandler
}) {
  const styleClass = STYLES[buttonStyle];
  const sizeClass = SIZES[buttonSize];

  return (
    <button
      className={`${styleClass} ${sizeClass} ${className ?? ''}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
