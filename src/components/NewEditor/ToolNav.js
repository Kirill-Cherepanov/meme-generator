import React from 'react';

export default function ToolNav({ setChosenBar }) {
  return (
    <div className="tool-bar nav-bar">
      <button
        className="tool nav-bar__home"
        onClick={() => setChosenBar('home')}
      >
        Home
      </button>
      <button
        className="tool nav-bar__image"
        onClick={() => setChosenBar('image')}
      >
        Image
      </button>
      <button
        className="tool nav-bar__text"
        onClick={() => setChosenBar('text')}
      >
        Text
      </button>
    </div>
  );
}
