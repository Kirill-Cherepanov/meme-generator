import React from 'react';
import './DropDownColor.scss';

export default function DropDownColor({ label, value, inputHandler }) {
  return (
    <div className="drop-down-menu__element drop-down-menu__color">
      <label htmlFor="drop-down-menu__color-input">{label}</label>
      <input
        type="color"
        value={value}
        onInput={inputHandler}
        className="drop-down-menu__color-input"
        id="drop-down-menu__color-input"
      />
    </div>
  );
}
