import React from 'react';

export default function DropDownList({ label, items, value, inputHandler }) {
  const optionElements = items.map((item, index) => {
    return <option key={index}>{item}</option>;
  });

  return (
    <div className="drop-down-menu__element drop-down-menu__list">
      <label>{label}</label>
      <select
        class="chosen-select"
        data-placeholder={label}
        onChange={inputHandler}
      >
        {optionElements}
      </select>
    </div>
  );
}
