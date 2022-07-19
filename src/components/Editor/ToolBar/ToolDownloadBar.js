import returnIcon from '../../../icons/return.png';
import downloadIcon from '../../../icons/download.png';

export default function ToolHomeBar({ returnToNav, downloadMeme }) {
  return (
    <ul className="tool-bar home-bar">
      <li className="tool-li">
        <button className="tool tool--return" onClick={returnToNav}>
          <img src={returnIcon} alt="" className="tool-icon return__icon" />
          <span className="tool-title return__title">Back</span>
        </button>
      </li>

      <li className="tool-li">
        <button className="tool nav-bar__image" onClick={downloadMeme}>
          <img
            src={downloadIcon}
            alt=""
            className="tool-icon image__icon"
          ></img>
          <span className="tool-title image__title">Download</span>
        </button>
      </li>
    </ul>
  );
}
