import React, { useContext } from 'react';
import { TextBoxContext } from '../../../context/TextBoxContext';
import returnIcon from '../../../icons/return.png';
import addIcon from '../../../icons/add.png';
import fontFamilyIcon from '../../../icons/font-family.png';
import textModsIcon from '../../../icons/text-mods.png';
import textColorIcon from '../../../icons/text-color.png';
import bgColorIcon from '../../../icons/bg-color.png';
import opacityIcon from '../../../icons/opacity.png';
import alignmentIcon from '../../../icons/alignment.png';
import deleteIcon from '../../../icons/delete.png';
import './ToolTextBar.scss';

export default function ToolTextBar({
  returnToNav,
  setDropMenuType,
  selectedTextBoxIndexState
}) {
  const [selectedIndex, setSelectedIndex] = selectedTextBoxIndexState;
  const { textBoxesData, dispatchTextData } = useContext(TextBoxContext);

  const deleteText = () => {
    if (selectedIndex === undefined) return;

    setDropMenuType(undefined);
    setSelectedIndex(undefined);
    dispatchTextData({
      type: 'delete',
      payload: {
        index: selectedIndex
      }
    });
  };

  const addtext = () => {
    setSelectedIndex(textBoxesData.length);
    dispatchTextData({
      type: 'add',
      payload: {
        index: selectedIndex
      }
    });
  };

  const handleSetDropMenuProps = (e) => {
    if (selectedIndex === undefined) return;
    setDropMenuType(e.currentTarget.dataset.type);
  };

  return (
    <ul
      className={
        'tool-bar text-bar' +
        (selectedIndex !== undefined ? ' index-selected' : '')
      }
    >
      <div className="tool-bar-row">
        <li className="tool-li">
          <button className="tool tool--return" onClick={returnToNav}>
            <img src={returnIcon} alt="" className="tool-icon return__icon" />
            <span className="tool-title return__title">Back</span>
          </button>
        </li>

        <li className="tool-li">
          <button className="tool text-bar__add" onClick={addtext}>
            <img src={addIcon} alt="" className="tool-icon add__icon" />
            <span className="tool-title add__title">Add</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__font"
            data-type="font"
            onClick={handleSetDropMenuProps}
          >
            <img src={fontFamilyIcon} alt="" className="tool-icon font__icon" />
            <span className="tool-title font__title">Font</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__text-modifiers"
            data-type="mods"
            onClick={handleSetDropMenuProps}
          >
            <img
              src={textModsIcon}
              alt=""
              className="tool-icon text-modifiers__icon"
            />
            <span className="tool-title text-modifiers__title">Mods</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__text-color"
            data-type="color"
            onClick={handleSetDropMenuProps}
          >
            <img
              src={textColorIcon}
              alt=""
              className="tool-icon text-color__icon"
            />
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
            <img
              src={bgColorIcon}
              alt=""
              className="tool-icon background__icon"
            />
            <span className="tool-title background__title">Background</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__opacity"
            data-type="opacity"
            onClick={handleSetDropMenuProps}
          >
            <img src={opacityIcon} alt="" className="tool-icon opacity__icon" />
            <span className="tool-title opacity__title">Opacity</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__alignment"
            data-type="alignment"
            onClick={handleSetDropMenuProps}
          >
            <img
              src={alignmentIcon}
              alt=""
              className="tool-icon alignment__icon"
            />
            <span className="tool-title alignment__title">Alignment</span>
          </button>
        </li>

        <li className="tool-li">
          <button
            className="tool text-bar__delete"
            data-type="delete"
            onClick={deleteText}
          >
            <img src={deleteIcon} alt="" className="tool-icon delete__icon" />
            <span className="tool-title delete__title">Delete</span>
          </button>
        </li>
      </div>
    </ul>
  );
}
