import React from 'react';

export default function ToolHomeBar({ returnToNav }) {
  return (
    <div className="tool-bar home-bar">
      <button className="tool tool__return" onClick={returnToNav}>
        Return
      </button>
      <button className="tool home-bar__template">Change Template</button>
      <button className="tool home-bar__reset">Reset Changes</button>
      <button className="tool home-bar__generate">Generate Meme</button>
    </div>
  );
}
