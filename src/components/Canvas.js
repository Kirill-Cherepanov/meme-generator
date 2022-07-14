import React, { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import './Canvas.scss';

// Should keep track of TextBox position relative to canvas and send it to ->App->ToolSidebar
// Should keep track of TextBox width and send it to ->App->ToolSidebar
// Should not be allowed to exit the canvas

export default function Canvas({
  image,
  handleSelection,
  handleChangePos,
  handleModifySidebarParams
}) {
  // const [x, setX] = useState();
  // const [y, setY] = useState();

  // const setPosition = (textBoxRef) => {
  //   // it might be index of textBoxRefs intead of textBoxRef
  //   const x = textBoxRef.current.offsetLeft;
  //   const y = textBoxRef.current.offsetTop;
  //   setX(x);
  //   setY(y);
  //   handleModifySidebarParams();
  // };

  const textBoxes = (
    <Rnd className="canvas__text-box" contentEditable={true}>
      WRITE YOUR TEXT HERE
    </Rnd>
  );
  useEffect(() => {
    // on dragging or resizing setPosition()
  }, []);

  return (
    <div className="canvas">
      <div className="canvas__container">
        {image}
        {textBoxes}
      </div>
    </div>
  );
}
