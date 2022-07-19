import React, { useState } from 'react';
import ToolTextBar from './ToolTextBar';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import ToolNavBar from './ToolNavBar';
import ToolDownloadBar from './ToolDownloadBar';
import './ToolBar.scss';

export default function ToolBar({
  selectedTextBoxIndexState,
  templateStylesState,
  generateMeme: generateMeme_,
  closeEditor,
  image,
  downloadMeme,
  closePopUp
}) {
  const [chosenBar, setChosenBar] = useState('nav');
  const [selectedTextBoxIndex, setSelectedTextBoxIndex] =
    selectedTextBoxIndexState;
  const [dropMenuType, setDropMenuType] = useState();
  const dropDownMenuPosState = useState({
    x: window.innerWidth / 2 - 100,
    y: 120
  });
  const generateMeme = () => {
    setChosenBar('download');
    return generateMeme_();
  };

  const switchBar = {
    nav: (
      <ToolNavBar
        closeEditor={closeEditor}
        setSelectedTextBoxIndex={setSelectedTextBoxIndex}
        generateMeme={generateMeme}
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
          closePopUp();
          setChosenBar('nav');
          if (dropMenuType !== undefined) setDropMenuType(undefined);
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
          image={image}
          dropDownMenuPosState={dropDownMenuPosState}
          templateStylesState={templateStylesState}
        ></DropDownMenu>
      )}
    </>
  );
}
