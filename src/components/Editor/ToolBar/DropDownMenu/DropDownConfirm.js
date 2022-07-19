import React from 'react';

export default function DropDownConfirm({ label, buttonText, inputHandler }) {
  return (
    <div className="drop-down-menu__element drop-down-menu__confirm">
      <label>{label}</label>
      <button className="drop-down-menu__confirm-btn" onInput={inputHandler}>
        {buttonText}
      </button>
    </div>
  );
}
