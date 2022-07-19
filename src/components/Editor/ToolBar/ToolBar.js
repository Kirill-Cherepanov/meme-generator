import React, { useState } from 'react';
import ToolTextBar from './ToolTextBar';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import ToolNavBar from './ToolNavBar';
import ToolDownloadBar from './ToolDownloadBar';
import './ToolBar.scss';

export default function ToolSidebar({
  selectedTextBoxIndexState,
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
  const dropDownMenuPosState = useState({ x: 0, y: 0 });
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
      />
    ),
    image: (
      <ToolNavBar
        closeEditor={closeEditor}
        setSelectedTextBoxIndex={setSelectedTextBoxIndex}
        generateMeme={generateMeme}
        setChosenBar={setChosenBar}
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
        ></DropDownMenu>
      )}
    </>
  );
}
