import React, { useState, useRef } from 'react';
import Canvas from '../Canvas/Canvas';
import ToolBar from '../ToolBar/ToolBar';
import MemePopUp from '../MemePopUp/MemePopUp';
import { TextBoxContext } from '../../context/TextBoxContext';
import useTextBoxData from '../../hooks/useTextBoxData';
import './TemplateEditor.scss';

export default function TemplateEditor({
  template,
  closeEditor: closeEditor_,
}) {
  const [selectedTextBoxIndex, setSelectedTextBoxIndex] = useState();
  const [memeGenerated, setMemeGenerated] = useState(false);
  const [templateStyles, setTemplateStyles] = useState({
    hueRotate: 0,
    saturation: 100,
    brightness: 100,
    blur: 0,
    sepia: 0,
  });
  const [textBoxesData, dispatchTextData] = useTextBoxData(
    JSON.parse(sessionStorage.getItem(template.url))
  );
  const [downloadMeme, setDownloadMeme] = useState(() => () => {});
  const imageRef = useRef(null);

  const closeEditor = () => {
    sessionStorage.setItem(template.url, JSON.stringify(textBoxesData));
    closeEditor_();
  };

  return (
    <TextBoxContext.Provider value={{ textBoxesData, dispatchTextData }}>
      <div className="template-editor">
        <ToolBar
          selectedTextBoxIndexState={[
            selectedTextBoxIndex,
            setSelectedTextBoxIndex,
          ]}
          templateStylesState={[templateStyles, setTemplateStyles]}
          togglePopUp={() => setMemeGenerated((memeGenerate) => !memeGenerate)}
          closeEditor={closeEditor}
          downloadMeme={downloadMeme}
        />
        <Canvas
          imgData={{
            ref: imageRef,
            src: template.url,
            filters: templateStyles,
          }}
          selectedTextBoxIndexState={[
            selectedTextBoxIndex,
            setSelectedTextBoxIndex,
          ]}
        />
        {memeGenerated && (
          <MemePopUp
            image={imageRef.current}
            setDownloadMeme={setDownloadMeme}
            filters={templateStyles}
          />
        )}
      </div>
    </TextBoxContext.Provider>
  );
}
