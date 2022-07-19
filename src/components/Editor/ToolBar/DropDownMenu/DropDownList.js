import React from 'react';

export default function DropDownList({ label, items, value, inputHandler }) {
  const optionElements = items.map((item, index) => {
    return (
      <button
        key={index}
        value={item}
        onClick={inputHandler}
        className="drop-down-menu__list-option"
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
