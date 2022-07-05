import React, { useRef, useState, useEffect } from 'react';
import TextBox from './TextBox';

const DEFAULT_TEXT = 'Write your text here';

// Should keep track of TextBox position relative to canvas and send it to ->App->ToolSidebar
// Should keep track of TextBox width and send it to ->App->ToolSidebar
// Should not be allowed to exit the canvas

// templateData = {
//   "id": "61579",
//   "name": "One Does Not Simply",
//   "url": "https://i.imgflip.com/1bij.jpg",
//   "width": 568,
//   "height": 335,
//   "box_count": 2
// }

export default function Canvas({
  templateData,
  handleSelection,
  handleModifySidebarProps
}) {
  return (
    <div className="canvas">
      <img src={templateData.url} alt="Template" />
      <TextBox>{DEFAULT_TEXT}</TextBox>
    </div>
  );
}

// # Canvas
//   Meme template
//   Draggable mutable (can change width, height and text on canvas (changes are displayed in (1))) text boxes
