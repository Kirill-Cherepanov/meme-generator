import React, { useState } from 'react';
import './TextBoxModify.scss';

const MAX_POS = 9999;
const MAX_SIZE = 9999;

export default function TextBoxModify({ selectedTextBoxInfo }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);

  const checkX = (e) => {
    if (e.target.value > MAX_POS) return (e.target.value = x);
    setX(e.target.value);
  };
  const checkY = (e) => {
    if (e.target.value > MAX_POS) return (e.target.value = y);
    setY(e.target.value);
  };
  const checkWidth = (e) => {
    if (e.target.value > MAX_SIZE) return (e.target.value = width);
    setWidth(e.target.value);
  };
  const checkHeight = (e) => {
    if (e.target.value > MAX_SIZE) return (e.target.value = height);
    setHeight(e.target.value);
  };

  return (
    <ul className="tools__modify-text-box">
      <ul className="tools__text-box-setting">
        <label htmlFor="color">Text color</label>
        <input type="color" className="tools__change-color" id="color" />
      </ul>

      <ul className="tools__text-box-setting">
        <label htmlFor="outline">Outline color</label>
        <input type="color" className="tools__change-outline" id="outline" />
      </ul>

      <ul className="tools__text-box-setting">
        <label htmlFor="X-pos">X position</label>
        <input
          type="number"
          value={x}
          onInput={checkX}
          className="tools__change-X-pos"
          id="X-pos"
        />
      </ul>

      <ul className="tools__text-box-setting">
        <label htmlFor="Y-pos">Y position</label>
        <input
          type="number"
          value={y}
          onInput={checkY}
          className="tools__change-Y-pos"
          id="Y-pos"
        />
      </ul>

      <ul className="tools__text-box-setting">
        <label htmlFor="height">Height</label>
        <input
          type="number"
          value={height}
          onInput={checkHeight}
          className="tools__change-height"
          id="height"
        />
      </ul>

      <ul className="tools__text-box-setting">
        <label htmlFor="width">Width</label>
        <input
          type="number"
          value={width}
          onInput={checkWidth}
          className="tools__change-width"
          id="width"
        />
      </ul>
    </ul>
  );
}

//   Change color
//   Change outline color
//   Position (it'll be dragable it will show the position here)
//   Width, height
