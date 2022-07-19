import React from 'react';
import './DropDownList.scss';

export default function DropDownList({ label, items, value, inputHandler }) {
  const optionElements = items.map((item, index) => {
    return (
      <button
        key={index}
        value={item}
        onClick={inputHandler}
        className={
          'drop-down-menu__list-option' + (value === item ? ' active' : '')
        }
        style={{
          fontFamily: item
        }}
      >
        {item}
      </button>
    );
  });

  return (
    <div className="drop-down-menu__element drop-down-menu__list">
      <label>{label}</label>
      <div className="drop-down-menu__list-options">{optionElements}</div>
    </div>
  );
}
