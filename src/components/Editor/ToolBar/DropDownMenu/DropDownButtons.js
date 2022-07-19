import React from 'react';
import './DropDownButtons.scss';

export default function DropDownButtons({ label, buttons }) {
  const buttonElements = buttons.map((buttonData, index) => {
    return (
      <button
        key={index}
        value={buttonData.value}
        onClick={buttonData.inputHandler}
        className={
          'drop-down-menu__buttons-btn' + (buttonData.isActive ? ' active' : '')
        }
      >
        <img
          src={buttonData.path}
          className="drop-down-menu__buttons-icon"
          alt=""
        />
      </button>
    );
  });

  return (
    <div className="drop-down-menu__element drop-down-menu__buttons">
      <label>{label}</label>
      <div className="drop-down-menu__element drop-down-menu__buttons-btns">
        {buttonElements}
      </div>
    </div>
  );
}
