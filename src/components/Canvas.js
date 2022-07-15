import React, { useContext } from 'react';
import { TextBoxContext } from './TemplateEditor';
import TextBox from './TextBox';
import './Canvas.scss';

export default function Canvas({ image, handleSelection }) {
  const { textBoxesData } = useContext(TextBoxContext);

  const textBoxes = textBoxesData.map((textBoxData, index) => {
    return (
      <TextBox key={index} index={index} handleSelection={handleSelection} />
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
