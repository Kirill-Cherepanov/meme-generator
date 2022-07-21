import React, { useState, useContext } from 'react';
import { TextBoxContext } from '../../context/TextBoxContext';
import ToolTextBar from './ToolTextBar/ToolTextBar';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import ToolNavBar from './ToolNavBar/ToolNavBar';
import ToolDownloadBar from './ToolDownloadBar/ToolDownloadBar';
import './ToolBar.scss';

export default function ToolBar({
  selectedTextBoxIndexState,
  templateStylesState,
  togglePopUp,
  closeEditor,
  downloadMeme
}) {
  const { dispatchTextData } = useContext(TextBoxContext);
  const setTemplateStyles = templateStylesState[1];
  const [chosenBar, setChosenBar] = useState('nav');
  const [selectedTextBoxIndex, setSelectedTextBoxIndex] =
    selectedTextBoxIndexState;
  const [dropMenuType, setDropMenuType] = useState();
  const dropDownMenuPosState = useState({
    x: window.innerWidth / 2 - 100,
    y: 120
  });
  const resetData = () => {
    setTemplateStyles({
      hueRotate: 0,
      saturation: 100,
      brightness: 100,
      blur: 0,
      sepia: 0
    });
    dispatchTextData({
      type: 'reset',
      payload: {}
    });
    setSelectedTextBoxIndex(undefined);
  };

  const switchBar = {
    nav: (
      <ToolNavBar
        closeEditor={closeEditor}
        setSelectedTextBoxIndex={setSelectedTextBoxIndex}
        resetData={resetData}
        togglePopUp={() => {
          setDropMenuType(undefined);
          togglePopUp();
        }}
        setChosenBar={setChosenBar}
        setDropMenuType={setDropMenuType}
      />
    ),
    text: (
      <ToolTextBar
        returnToNav={() => {
          setChosenBar('nav');
          if (dropMenuType !== undefined) setDropMenuType(undefined);
        }}
        selectedTextBoxIndexState={selectedTextBoxIndexState}
        setDropMenuType={setDropMenuType}
      />
    ),
    download: (
      <ToolDownloadBar
        returnToNav={() => {
          togglePopUp();
          setChosenBar('nav');
        }}
        downloadMeme={downloadMeme}
      ></ToolDownloadBar>
    )
  };

  return (
    <>
      {switchBar[chosenBar]}
      {dropMenuType && (
        <DropDownMenu
          dropMenuState={[dropMenuType, setDropMenuType]}
          selectedIndex={selectedTextBoxIndex}
          dropDownMenuPosState={dropDownMenuPosState}
          templateStylesState={templateStylesState}
        ></DropDownMenu>
      )}
    </>
  );
}
