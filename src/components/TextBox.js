import React from 'react';

const DEFAULT_TEXT = 'Write your text here';

export default function TextBox({ innerRef }) {
  return <div ref={innerRef}>{DEFAULT_TEXT}</div>;
}
