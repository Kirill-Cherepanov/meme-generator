import React, { useContext } from 'react';
import { TextBoxContext } from '../Editor/TemplateEditor';
import { DEFAULT_TEXT_BOXES_DATA } from '../Editor/TemplateEditor';
import './ToolTextBar.scss';

export default function ToolTextBar({
  returnToNav,
  setDropMenuType,
  selectedTextBoxIndexState
}) {
  const [selectedIndex, setSelectedIndex] = selectedTextBoxIndexState;
  const { setTextBoxesData } = useContext(TextBoxContext);

  const deleteText = () => {
    if (selectedIndex === undefined) return;

    setDropMenuType(undefined);
    setSelectedIndex(undefined);
    setTextBoxesData((textBoxesData) => {
      return [
        ...textBoxesData.slice(0, selectedIndex),
        null,
        ...textBoxesData.slice(selectedIndex + 1)
      ];
    });
  };

  const addtext = () => {
    setTextBoxesData((textBoxesData) => {
      return [...textBoxesData, DEFAULT_TEXT_BOXES_DATA];
    });
  };

  const handleSetDropMenuProps = (e) => {
    if (selectedIndex === undefined) return;
    setDropMenuType(e.target.dataset.type);
  };

  return (
    <ul className="tool-bar text-bar">
      <div className="tool-bar-row">
        <li className="tool-li">
          <button className="tool tool--return" onClick={returnToNav}>
            <span className="tool-icon return__icon"></span>
            <span className="tool-title return__title">Back</span>
          </button>
        </li>

        <li className="tool-li">
          <button className="tool text-bar__add" onClick={addtext}>
            <span className="tool-icon add__icon"></span>
            <span className="tool-title add__title">Add</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__font"
            data-type="font"
            onClick={handleSetDropMenuProps}
          >
            <span className="tool-icon font__icon"></span>
            <span className="tool-title font__title">Font</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__text-modifiers"
            data-type="mods"
            onClick={handleSetDropMenuProps}
          >
            <span className="tool-icon text-modifiers__icon"></span>
            <span className="tool-title text-modifiers__title">Mods</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__text-color"
            data-type="color"
            onClick={handleSetDropMenuProps}
          >
            <span className="tool-icon text-color__icon"></span>
            <span className="tool-title text-color__title">Color</span>
          </button>
        </li>
      </div>

      <div className="tool-bar-row">
        <li className="tool-li">
          <button
            className="tool text-bar__background"
            data-type="background"
            onClick={handleSetDropMenuProps}
          >
            <span className="tool-icon background__icon"></span>
            <span className="tool-title background__title">Background</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__opacity"
            data-type="opacity"
            onClick={handleSetDropMenuProps}
          >
            <span className="tool-icon opacity__icon"></span>
            <span className="tool-title opacity__title">Opacity</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__alignment"
            data-type="alignment"
            onClick={handleSetDropMenuProps}
          >
            <span className="tool-icon alignment__icon"></span>
            <span className="tool-title alignment__title">Alignment</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__delete"
            data-type="delete"
            onClick={deleteText}
          >
            <span className="tool-icon delete__icon"></span>
            <span className="tool-title delete__title">Delete</span>
          </button>
        </li>
      </div>
    </ul>
  );
}
