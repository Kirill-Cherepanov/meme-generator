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
    setTextBoxesData({});
    setSelectedTextBoxIndex(undefined);
  };

  return (
    <div className="tool-bar home-bar">
      <button className="tool tool--return" onClick={returnToNav}>
        Return
      </button>
      <button className="tool home-bar__template" onClick={closeEditor}>
        Change Template
      </button>
      <button className="tool home-bar__reset" onClick={resetData}>
        Reset Changes
      </button>
      <button className="tool home-bar__generate" onClick={generateMeme}>
        Generate Meme
      </button>
    </div>
  );
}
