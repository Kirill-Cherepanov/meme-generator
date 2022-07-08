import React from 'react';

const DEFAULT_TEXT = 'Write your text here';

export default function TextBox({ innerRef }) {
  return (
    <div ref={innerRef} className="canvas__text-box">
      {DEFAULT_TEXT}
    </div>
  );
}
