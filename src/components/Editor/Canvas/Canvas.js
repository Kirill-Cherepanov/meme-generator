import React, { useContext } from 'react';
import { TextBoxContext } from '../TemplateEditor';
import TextBox from './TextBox';
import './Canvas.scss';

export default function Canvas({ selectedTextBoxIndexState, imgData }) {
  const { textBoxesData } = useContext(TextBoxContext);

  const textBoxes = textBoxesData.map((textBoxData, index) => {
    return (
      textBoxData && (
        <TextBox
          key={index}
          index={index}
          selectedTextBoxIndexState={selectedTextBoxIndexState}
        />
      )
    );
  });

  return (
    <div className="canvas">
      <div className="canvas__container">
        <img
          src={imgData.src}
          crossOrigin="anonymous"
          ref={imgData.ref}
          style={{
            filter: `hue-rotate(${imgData.filters.hueRotate}deg) saturate(${imgData.filters.saturation}%) brightness(${imgData.filters.brightness}%) blur(${imgData.filters.blur}px) sepia(${imgData.filters.sepia}%)`
          }}
          alt="Template"
          className="canvas__img"
        />
        {textBoxes}
      </div>
    </div>
  );
}
