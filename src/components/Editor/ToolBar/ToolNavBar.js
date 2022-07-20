import resetIcon from '../../../icons/reset.png';
import generateIcon from '../../../icons/generate.png';
import homeIcon from '../../../icons/home.png';
import imageFilterIcon from '../../../icons/image-filter.png';
import textIcon from '../../../icons/text.png';

export default function ToolNavBar({
  closeEditor,
  togglePopUp,
  setChosenBar,
  setDropMenuType,
  resetData
}) {
  return (
    <ul className="tool-bar home-bar">
      <li className="tool-li">
        <button className="tool nav-bar__home" onClick={closeEditor}>
          <img src={homeIcon} alt="" className="tool-icon home__icon" />
          <span className="tool-title home__title">Home</span>
        </button>
      </li>

      <li className="tool-li">
        <button
          className="tool nav-bar__image"
          onClick={() => setDropMenuType('filters')}
        >
          <img
            src={imageFilterIcon}
            alt=""
            className="tool-icon image__icon"
          ></img>
          <span className="tool-title image__title">Filters</span>
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

      <li className="tool-li">
        <button className="tool home-bar__reset" onClick={resetData}>
          <img src={resetIcon} alt="" className="tool-icon reset__icon" />
          <span className="tool-title reset__title">Reset</span>
        </button>
      </li>

      <li className="tool-li">
        <button
          className="tool home-bar__generate"
          onClick={() => {
            setChosenBar('download');
            togglePopUp();
          }}
        >
          <img src={generateIcon} alt="" className="tool-icon generate__icon" />
          <span className="tool-title generate__title">Generate</span>
        </button>
      </li>
    </ul>
  );
}
