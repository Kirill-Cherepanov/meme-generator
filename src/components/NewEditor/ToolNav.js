import React, { useState, useContext } from 'react';
import { TextBoxContext } from '../Editor/TemplateEditor';
import TextBar from './TextBar';
import DropDownMenu from './DropDownMenu';

export default function ToolSidebar({
  selectedTextBoxIndex,
  generateMeme,
  closeEditor
}) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);
  const [chosen, setchosen] = useState();

  return (
    <div className="tool-bar tool-nav">
      <button className="tool tool-nav__home">Home</button>
      <button className="tool tool-nav__image">Image</button>
      <button className="tool tool-nav__text">Text</button>
    </div>
  );
}
