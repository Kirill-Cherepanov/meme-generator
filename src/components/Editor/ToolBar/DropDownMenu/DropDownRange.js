import React from 'react';
import './DropDownRange.scss';

export default function DropDownRange({
  label,
  min,
  max,
  value,
  numberLabel,
  inputHandler
}) {
  return (
    <div className="drop-down-menu__element drop-down-menu__range">
      <label htmlFor="drop-down-menu__range-input">{label}</label>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onInput={inputHandler}
        className="drop-down-menu__range-input"
        id="drop-down-menu__range-input"
      />
      <input
        type="number"
        value={value}
        className="drop-down-menu__range-input-number"
        onInput={inputHandler}
        id="drop-down-menu__range-input-number"
      />
      <label htmlFor="drop-down-menu__range-input-number">{numberLabel}</label>
    </div>
  );
}
