import React from 'react';
import './AnimatedButton.scss';

export default function AnimatedButton({ children, className, clickHandler }) {
  return (
    <button className="animated-button" onClick={clickHandler}>
      <span>{children}</span>
    </button>
  );
}
