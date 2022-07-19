import React from 'react';
import homeIcon from '../../../icons/home.png';
import imageFilterIcon from '../../../icons/image-filter.png';
import textIcon from '../../../icons/text.png';

export default function ToolNavBar({ setChosenBar }) {
  return (
    <ul className="tool-bar nav-bar">
      <li className="tool-li">
        <button
          className="tool nav-bar__home"
          onClick={() => setChosenBar('home')}
        >
          <img src={homeIcon} alt="" className="tool-icon home__icon" />
          <span className="tool-title home__title">Home</span>
        </button>
      </li>

      <li className="tool-li">
        <button
          className="tool nav-bar__image"
          onClick={() => setChosenBar('image')}
        >
          <img
            src={imageFilterIcon}
            alt=""
            className="tool-icon image__icon"
          ></img>
          <span className="tool-title image__title">Image</span>
        </button>
      </li>

      <li className="tool-li">
        <button
          className="tool nav-bar__text"
          onClick={() => setChosenBar('text')}
        >
          <img src={textIcon} alt="" className="tool-icon text__icon"></img>
          <span className="tool-title text__title">Text</span>
        </button>
      </li>
    </ul>
  );
}
