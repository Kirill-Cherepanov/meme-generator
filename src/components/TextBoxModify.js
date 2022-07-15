import React, { useContext } from 'react';
import './TextBoxModify.scss';
import { TextBoxContext } from './TemplateEditor';

// const MAX_POS = 9999;
// const MAX_SIZE = 9999;
// const MAX_FONT_SIZE = 1024;

function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const MAX_VALUES = {
  x: 9999,
  y: 9999,
  height: 9999,
  width: 9999,
  fontSize: 1024
};

export default function TextBoxModify({ selectedIndex }) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);
  const selectedTextBox = textBoxesData[selectedIndex];

  const updateValue = (e) => {
    const type = e.target.dataset.type;
    const value = isNumeric(e.target.value)
      ? Number(e.target.value)
      : e.target.value;

    if (MAX_VALUES[type] !== undefined && MAX_VALUES[type] < value) {
      e.target.value = selectedTextBox[type];
      return;
    }

    const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
    newTextBoxesData[selectedIndex][type] = value;
    setTextBoxesData(newTextBoxesData);
  };

  return (
    <>
      <h3 className="tools__modify-text-box-title">Modify text box</h3>
      <ul className="tools__modify-text-box">
        <li className="tools__text-box-setting">
          <label htmlFor="color">Text color</label>
          <input
            type="color"
            data-type="color"
            value={selectedTextBox.color}
            onInput={updateValue}
            className="tools__change-color"
            id="color"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="outline">Outline color</label>
          <input
            type="color"
            data-type="outlineColor"
            value={selectedTextBox.outlineColor}
            onInput={updateValue}
            className="tools__change-outline"
            id="outline"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="X-pos">X position</label>
          <input
            type="number"
            data-type="x"
            value={selectedTextBox.x}
            onInput={updateValue}
            className="tools__change-X-pos"
            id="X-pos"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="Y-pos">Y position</label>
          <input
            type="number"
            data-type="y"
            value={selectedTextBox.y}
            onInput={updateValue}
            className="tools__change-Y-pos"
            id="Y-pos"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="height">Height</label>
          <input
            type="number"
            data-type="height"
            value={selectedTextBox.height}
            onInput={updateValue}
            className="tools__change-height"
            id="height"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="width">Width</label>
          <input
            type="number"
            data-type="width"
            value={selectedTextBox.width}
            onInput={updateValue}
            className="tools__change-width"
            id="width"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="font-size">Font size (px)</label>
          <input
            type="number"
            data-type="fontSize"
            value={selectedTextBox.fontSize}
            onInput={updateValue}
            className="tools__change-width"
            id="font-size"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="font-family">Font family</label>
          <input
            type="text"
            data-type="fontFamily"
            value={selectedTextBox.fontFamily}
            onInput={updateValue}
            className="tools__change-width"
            id="font-family"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="background-color">Background color</label>
          <input
            type="color"
            data-type="backgroundColor"
            value={selectedTextBox.backgroundColor}
            onInput={updateValue}
            className="tools__change-width"
            id="background-color"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="background-opacity">Background opacity</label>
          <input
            type="range"
            data-type="backgroundOpacity"
            value={selectedTextBox.backgroundOpacity}
            onInput={updateValue}
            min="0"
            max="1"
            step="0.01"
            className="tools__change-width"
            id="background-opacity"
          />
        </li>
      </ul>
    </>
  );
}
