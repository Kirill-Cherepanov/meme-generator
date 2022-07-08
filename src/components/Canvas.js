import React, { useRef, useState, useEffect } from 'react';
import TextBox from './TextBox';
import './Canvas.scss';

// Should keep track of TextBox position relative to canvas and send it to ->App->ToolSidebar
// Should keep track of TextBox width and send it to ->App->ToolSidebar
// Should not be allowed to exit the canvas

export default function Canvas({
  templateData,
  handleSelection,
  handleModifySidebarParams
}) {
  const textBoxRefs = useRef([]);
  const [x, setX] = useState();
  const [y, setY] = useState();

  const textBoxes = Array(templateData.box_count)
    .fill(0)
    .map((item, index) => (
      <TextBox
        key={index}
        innerRef={(element) => textBoxRefs.current.push(element)}
      />
    ));

  const setPosition = (textBoxRef) => {
    // it might be index of textBoxRefs intead of textBoxRef
    const x = textBoxRef.current.offsetLeft;
    const y = textBoxRef.current.offsetTop;
    setX(x);
    setY(y);
    handleModifySidebarParams();
  };

  useEffect(() => {
    // on dragging or resizing setPosition()
  }, []);

  return (
    <div className="canvas">
      <img src={templateData.url} alt="Template" className="canvas__img" />
      {textBoxes}
    </div>
  );
}

// # Canvas
//   Meme template
//   Draggable mutable (can change width, height and text on canvas (changes are displayed in (1))) text boxes
