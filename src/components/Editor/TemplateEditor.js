import React, { useState, useRef, createContext } from 'react';
import Canvas from './Canvas/Canvas';
import ToolBar from './ToolBar/ToolBar';
import MemePopUp from './MemePopUp';
import './TemplateEditor.scss';
// import { useEffect } from 'react';

export const DEFAULT_TEXT_BOXES_DATA = {
  text: 'WRITE YOUR TEXT HERE',
  y: 0,
  x: 0,
  height: window.innerWidth > 450 ? 50 : 35,
  width:
    window.innerWidth > 900
      ? 365
      : window.innerWidth > 600
      ? 300
      : window.innerHeight > 450
      ? 240
      : 200,
  color: '#FFFFFF',
  outlineColor: '#000000',
  opacity: 100,
  backgroundColor: '#FFFFFF',
  backgroundOpacity: 0,
  fontSize:
    window.innerWidth > 900
      ? 32
      : window.innerWidth > 600
      ? 26
      : window.innerWidth > 450
      ? 20
      : 16,
  fontFamily: 'Roboto',
  textMods: {
    bold: false,
    italic: false,
    underlined: false,
    crossed: false
  },
  alignment: 'center'
};

export const TextBoxContext = createContext([]);

export default function TemplateEditor({
  template,
  closeEditor: closeEditor_
}) {
  const [selectedTextBoxIndex, setSelectedTextBoxIndex] = useState();
  const [memeGenerated, setMemeGenerated] = useState(false);
  const [templateStyles, setTemplateStyles] = useState({
    hueRotate: 0,
    saturation: 100,
    brightness: 100,
    blur: 0,
    sepia: 0
  });
  const [textBoxesData, setTextBoxesData] = useState(
    JSON.parse(sessionStorage.getItem(template.url)) || [
      DEFAULT_TEXT_BOXES_DATA
    ]
  );
  const [downloadMeme, setDownloadMeme] = useState(() => () => {});

  const imageRef = useRef(null);

  const closeEditor = () => {
    sessionStorage.setItem(template.url, JSON.stringify(textBoxesData));
    closeEditor_();
  };

  // For testing
  // useEffect(() => {
  //   const test = () => {
  //     console.log('here');
  //     setTemplateStyles((styles) => {
  //       return { ...styles, ...{ blur: 10 } };
  //     });
  //   };

  //   window.addEventListener('keydown', test);

  //   return () => window.removeEventListener('keydown', test);
  // }, [setTemplateStyles]);

  return (
    <TextBoxContext.Provider value={{ textBoxesData, setTextBoxesData }}>
      <div className="template-editor">
        <ToolBar
          selectedTextBoxIndexState={[
            selectedTextBoxIndex,
            setSelectedTextBoxIndex
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
            filters: templateStyles
          }}
          selectedTextBoxIndexState={[
            selectedTextBoxIndex,
            setSelectedTextBoxIndex
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
