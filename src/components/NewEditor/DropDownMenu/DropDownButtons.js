import React from 'react';

export default function DropDownButtons({ label, buttons }) {
  const buttonElements = buttons.map((buttonData, index) => {
    return (
      <button
        key={index}
        value={buttonData.value}
        data-src={buttonData.path}
        onClick={buttonData.inputHandler}
        className="drop-down-menu__buttons-btn"
      >
        {buttonData.isActive ? 'active' : 'disabled'}
      </button>
    );
  });

  return (
    <div className="drop-down-menu__element drop-down-menu__buttons">
      <label>{label}</label>
      {buttonElements}
    </div>
  );
}
