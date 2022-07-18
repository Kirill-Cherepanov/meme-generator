import React, { useContext } from 'react';
import { TextBoxContext } from '../Editor/TemplateEditor';
import { DEFAULT_TEXT_BOXES_DATA } from '../Editor/TemplateEditor';

export default function ToolTextBar({
  returnToNav,
  setDropMenuType,
  selectedIndex
}) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);

  const deleteText = () => {
    if (selectedIndex === undefined) return;
    const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
    newTextBoxesData[selectedIndex] = null;
    setTextBoxesData(newTextBoxesData);
  };

  const addtext = () => {
    const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
    newTextBoxesData[textBoxesData.length] = DEFAULT_TEXT_BOXES_DATA;
    setTextBoxesData(newTextBoxesData);
  };

  const handleSetDropMenuProps = (e) => {
    if (selectedIndex === undefined) return;
    setDropMenuType(e.target.dataset.type);
  };

  return (
    <div className="tool-bar text-bar">
      <button className="tool tool--return" onClick={returnToNav}>
        Back
      </button>
      <button className="tool tool--return" onClick={addtext}>
        Add
      </button>
      <button
        className="tool text-bar__font"
        data-type="font"
        onClick={handleSetDropMenuProps}
      >
        Font
      </button>
      <button
        className="tool text-bar__text-modifiers"
        data-type="mods"
        onClick={handleSetDropMenuProps}
      >
        Mods
      </button>
      <button
        className="tool text-bar__text-color"
        data-type="color"
        onClick={handleSetDropMenuProps}
      >
        Color
      </button>
      <button
        className="tool text-bar__background"
        data-type="background"
        onClick={handleSetDropMenuProps}
      >
        Background
      </button>
      <button
        className="tool text-bar__opacity"
        data-type="opacity"
        onClick={handleSetDropMenuProps}
      >
        Opacity
      </button>
      <button
        className="tool text-bar__alignment"
        data-type="alignment"
        onClick={handleSetDropMenuProps}
      >
        Alignment
      </button>
      <button
        className="tool text-bar__delete"
        data-type="delete"
        onClick={deleteText}
      >
        Delete
      </button>
    </div>
  );
}
