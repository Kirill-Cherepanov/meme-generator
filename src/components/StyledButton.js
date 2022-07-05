import React from 'react';

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
  buttonStyle,
  size,
  clickHandler
}) {
  const styleClass = STYLES[buttonStyle];
  const sizeClass = SIZES[size];

  return (
    <button className={`${styleClass} ${sizeClass}`} onClick={clickHandler}>
      {children}
    </button>
  );
}
