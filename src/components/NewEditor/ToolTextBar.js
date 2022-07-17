import React from 'react';

export default function TextBar({ returnToNav }) {
  return (
    <div className="tool-bar text-bar">
      <button className="tool tool--return" onClick={returnToNav}>
        Back
      </button>
      <button className="tool text-bar__font">B</button>
      <button className="tool text-bar__text-modifiers">B</button>
      <button className="tool text-bar__text-color">B</button>
      <button className="tool text-bar__background">B</button>
      <button className="tool text-bar__opacity">B</button>
      <button className="tool text-bar__alignment">B</button>
      <button className="tool text-bar__delete">B</button>
    </div>
  );
}
