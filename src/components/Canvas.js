import React, { useRef, useState, useEffect } from 'react';
import TextBox from './TextBox';
import './Canvas.scss';

// Should keep track of TextBox position relative to canvas and send it to ->App->ToolSidebar
// Should keep track of TextBox width and send it to ->App->ToolSidebar
// Should not be allowed to exit the canvas

export default function Canvas({
  image,
  handleSelection,
  handleModifySidebarParams
}) {
  // useEffect(() => {
  //   console.log(templateData);
  //   addTextToImage(templateData.url, 'Write your text here');
  // }, [templateData]);

  const textBoxRefs = useRef([]);
  const [x, setX] = useState();
  const [y, setY] = useState();

  // const textBoxes = Array(templateData.box_count)
  //   .fill(0)
  //   .map((item, index) => (
  //     <TextBox
  //       key={index}
  //       innerRef={(element) => textBoxRefs.current.push(element)}
  //     />
  //   ));

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
      <div className="canvas__container">
        {image}
        {/* {textBoxes} */}
      </div>
    </div>
  );
}

// function debugBase64(base64URL) {
//   const win = window.open();
//   win.document.write(
//     `<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
//   );
//   win.document.close();
// }

// function addTextToImage(imagePath, text) {
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');

//   const img = new Image();
//   img.crossOrigin = 'anonymous';
//   img.src = imagePath;
//   img.onload = function () {
//     context.drawImage(img, 0, 0);
//     context.lineWidth = 1;
//     context.fillStyle = '#CC00FF';
//     context.lineStyle = '#ffff00';
//     context.font = '18px sans-serif';
//     context.fillText(text, 50, 50);
//     debugBase64(canvas.toDataURL('image/png'));
//   };
// }
