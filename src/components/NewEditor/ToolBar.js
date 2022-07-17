import React, { useState } from 'react';
import ToolTextBar from './ToolTextBar';
import DropDownMenu from './DropDownMenu';
import ToolNav from './ToolNav';
import ToolHomeBar from './ToolHomeBar';

export default function ToolSidebar({
  selectedTextBoxIndex,
  generateMeme,
  closeEditor
}) {
  const [chosenBar, setChosenBar] = useState('nav');

  const switchBar = {
    nav: <ToolNav setChosenBar={setChosenBar} />,
    home: <ToolHomeBar returnToNav={() => setChosenBar('nav')} />,
    image: <ToolNav setChosenBar={setChosenBar} />,
    text: <ToolTextBar returnToNav={() => setChosenBar('nav')} />
  };

  return <>{switchBar[chosenBar]}</>;
}
