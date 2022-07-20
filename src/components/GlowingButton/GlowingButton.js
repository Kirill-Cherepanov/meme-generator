import React from 'react';
import './GlowingButton.scss';

export default function GlowingButton({
  children,
  className = '',
  clickHandler
}) {
  return (
    <button className={'glowing-button ' + className} onClick={clickHandler}>
      {children}
    </button>
  );
}
