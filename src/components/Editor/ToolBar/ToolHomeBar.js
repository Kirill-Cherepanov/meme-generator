import { useContext } from 'react';
import { TextBoxContext } from '../TemplateEditor';
import returnIcon from '../../../icons/return.png';
import templateIcon from '../../../icons/template.png';
import resetIcon from '../../../icons/reset.png';
import generateIcon from '../../../icons/generate.png';

export default function ToolHomeBar({
  returnToNav,
  closeEditor,
  setSelectedTextBoxIndex,
  generateMeme
}) {
  const { setTextBoxesData } = useContext(TextBoxContext);
  const resetData = () => {
    setTextBoxesData([]);
    setSelectedTextBoxIndex(undefined);
  };

  return (
    <ul className="tool-bar home-bar">
      <li className="tool-li">
        <button className="tool tool--return" onClick={returnToNav}>
          <img src={returnIcon} alt="" className="tool-icon return__icon" />
          <span className="tool-title return__title">Back</span>
        </button>
      </li>

      <li className="tool-li">
        <button className="tool home-bar__template" onClick={closeEditor}>
          <img src={templateIcon} alt="" className="tool-icon template__icon" />
          <span className="tool-title template__title">Change Template</span>
        </button>
      </li>

      <li className="tool-li">
        <button className="tool home-bar__reset" onClick={resetData}>
          <img src={resetIcon} alt="" className="tool-icon reset__icon" />
          <span className="tool-title reset__title">Reset Changes</span>
        </button>
      </li>

      <li className="tool-li">
        <button className="tool home-bar__generate" onClick={generateMeme}>
          <img src={generateIcon} alt="" className="tool-icon generate__icon" />
          <span className="tool-title generate__title">Generate Meme</span>
        </button>
      </li>
    </ul>
  );
}
