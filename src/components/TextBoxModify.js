import React from 'react';
import './TextBoxModify.scss';

export default function TextBoxModify({ selectedTextBoxInfo }) {
  return (
    <div className="tools__modify-text-box">
      <label htmlFor="color">Text color</label>
      <input type="color" className="tools__change-color" id="color" />

      <label htmlFor="outline">Outline color</label>
      <input type="color" className="tools__change-outline" id="outline" />

      <label htmlFor="X-pos">X position</label>
      <input type="number" className="tools__change-X-pos" id="X-pos" />

      <label htmlFor="Y-pos">Y position</label>
      <input type="number" className="tools__change-Y-pos" id="Y-pos" />

      <label htmlFor="height">Height</label>
      <input type="number" className="tools__change-height" id="height" />

      <label htmlFor="width">Width</label>
      <input type="number" className="tools__change-width" id="width" />
    </div>
  );
}

//   Change color
//   Change outline color
//   Position (it'll be dragable it will show the position here)
//   Width, height
