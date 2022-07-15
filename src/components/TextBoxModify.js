import React, { useContext } from 'react';
import './TextBoxModify.scss';
import { TextBoxContext } from './TemplateEditor';

const MAX_POS = 9999;
const MAX_SIZE = 9999;

export default function TextBoxModify({ selectedIndex }) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);
  const selectedTextBox = textBoxesData[selectedIndex];

  const updateData = () => {
    const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
    newTextBoxesData[selectedIndex] = selectedTextBox;
    setTextBoxesData(newTextBoxesData);
  };
  const checkX = (e) => {
    if (e.target.value > MAX_POS) return (e.target.value = selectedTextBox.x);
    selectedTextBox.x = Number(e.target.value);
    updateData();
  };
  const checkY = (e) => {
    if (e.target.value > MAX_POS) return (e.target.value = selectedTextBox.y);
    selectedTextBox.y = Number(e.target.value);
    updateData();
  };
  const checkWidth = (e) => {
    if (e.target.value > MAX_SIZE)
      return (e.target.value = selectedTextBox.width);
    selectedTextBox.width = Number(e.target.value);
    updateData();
  };
  const checkHeight = (e) => {
    if (e.target.value > MAX_SIZE)
      return (e.target.value = selectedTextBox.height);
    selectedTextBox.height = Number(e.target.value);
    updateData();
  };

  return (
    <>
      <h3 className="tools__modify-text-box-title">Modify text box</h3>
      <ul className="tools__modify-text-box">
        <li className="tools__text-box-setting">
          <label htmlFor="color">Text color</label>
          <input
            type="color"
            value="#FFFFFF"
            onInput={() => {}}
            className="tools__change-color"
            id="color"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="outline">Outline color</label>
          <input type="color" className="tools__change-outline" id="outline" />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="X-pos">X position</label>
          <input
            type="number"
            value={selectedTextBox.x}
            onInput={checkX}
            className="tools__change-X-pos"
            id="X-pos"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="Y-pos">Y position</label>
          <input
            type="number"
            value={selectedTextBox.y}
            onInput={checkY}
            className="tools__change-Y-pos"
            id="Y-pos"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="height">Height</label>
          <input
            type="number"
            value={selectedTextBox.height}
            onInput={checkHeight}
            className="tools__change-height"
            id="height"
          />
        </li>

        <li className="tools__text-box-setting">
          <label htmlFor="width">Width</label>
          <input
            type="number"
            value={selectedTextBox.width}
            onInput={checkWidth}
            className="tools__change-width"
            id="width"
          />
        </li>
      </ul>
    </>
  );
}
