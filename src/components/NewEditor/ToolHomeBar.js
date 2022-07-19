import React from 'react';
import { useContext } from 'react';
import { TextBoxContext } from '../Editor/TemplateEditor';

export default function ToolHomeBar({
  returnToNav,
  closeEditor,
  setSelectedTextBoxIndex,
  generateMeme
}) {
  const { setTextBoxesData } = useContext(TextBoxContext);
  const resetData = () => {
    setTextBoxesData([]);
    setSelectedTextBoxIndex(undefined);
  };

  return (
    <ul className="tool-bar home-bar">
      <li className="tool-li">
        <button className="tool tool--return" onClick={returnToNav}>
          <span className="tool-icon return__icon"></span>
          <span className="tool-title return__title">Back</span>
        </button>
      </li>

      <li className="tool-li">
        <button className="tool home-bar__template" onClick={closeEditor}>
          <span className="tool-icon template__icon"></span>
          <span className="tool-title template__title">Change Template</span>
        </button>
      </li>

      <li className="tool-li">
        <button className="tool home-bar__reset" onClick={resetData}>
          <span className="tool-icon reset__icon"></span>
          <span className="tool-title reset__title">Reset Changes</span>
        </button>
      </li>

      <li className="tool-li">
        <button className="tool home-bar__generate" onClick={generateMeme}>
          <span className="tool-icon generate__icon"></span>
          <span className="tool-title generate__title">Generate Meme</span>
        </button>
      </li>
    </ul>
  );
}
