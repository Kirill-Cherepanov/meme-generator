import React from 'react';

export default function ToolNavBar({ setChosenBar }) {
  return (
    <ul className="tool-bar nav-bar">
      <li className="tool-li">
        <button
          className="tool nav-bar__home"
          onClick={() => setChosenBar('home')}
        >
          <span className="tool-icon home__icon"></span>
          <span className="tool-title home__title">Home</span>
        </button>
      </li>

      <li className="tool-li">
        <button
          className="tool nav-bar__image"
          onClick={() => setChosenBar('image')}
        >
          <span className="tool-icon image__icon"></span>
          <span className="tool-title image__title">Image</span>
        </button>
      </li>

      <li className="tool-li">
        <button
          className="tool nav-bar__text"
          onClick={() => setChosenBar('text')}
        >
          <span className="tool-icon text__icon"></span>
          <span className="tool-title text__title">Text</span>
        </button>
      </li>
    </ul>
  );
}
