import React from 'react';
import { useContext } from 'react';
import { TextBoxContext } from '../Editor/TemplateEditor';

// Font Family & Size, Text Modifiers, Text Color, Background Color with Background Opacity, Overall Opacity, Text Alignment, Delete Text

export default function TextBar() {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);

  return (
    <div className="text-bar">
      <button className="text-bar__font"></button>
      <button className="text-bar__text-modifiers"></button>
      <button className="text-bar__text-color"></button>
      <button className="text-bar__background"></button>
      <button className="text-bar__opacity"></button>
      <button className="text-bar__alignment"></button>
      <button className="text-bar__delete"></button>
    </div>
  );
}
