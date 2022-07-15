import React, { useContext } from 'react';
import { Rnd } from 'react-rnd';
import './Canvas.scss';
import { TextBoxContext } from './TemplateEditor';

export default function Canvas({ image, handleSelection }) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);
  // console.log(textBoxesData);

  const textBoxes = textBoxesData.map((textBoxData, index) => {
    return (
      <Rnd
        key={index} // We are using index because data is dynamic
        className="canvas__text-box"
        contentEditable={true}
        suppressContentEditableWarning={true} // Убрать если будут баги!
        position={{
          x: textBoxData.x,
          y: textBoxData.y
        }}
        size={{
          width: textBoxData.width,
          height: textBoxData.height
        }}
        onDragStart={(e, d) => {
          handleSelection(index);
        }}
        onResizeStart={(e, d) => {
          handleSelection(index);
        }}
        onDrag={(e, d) => {
          const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
          newTextBoxesData[index].x = d.x;
          newTextBoxesData[index].y = d.y;
          setTextBoxesData(newTextBoxesData);
        }}
        onResize={(e, direction, ref, delta, position) => {
          const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
          newTextBoxesData[index].width = ref.offsetWidth;
          newTextBoxesData[index].height = ref.offsetHeight;
          newTextBoxesData[index].x = position.x;
          newTextBoxesData[index].y = position.y;
          setTextBoxesData(newTextBoxesData);
        }}
      >
        WRITE YOUR TEXT HERE
      </Rnd>
    );
  });

  return (
    <div className="canvas">
      <div className="canvas__container">
        {image}
        {textBoxes}
      </div>
    </div>
  );
}
