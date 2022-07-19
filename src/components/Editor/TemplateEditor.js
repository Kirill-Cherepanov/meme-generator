import React, { useState, createContext } from 'react';
import Canvas from './Canvas/Canvas';
// import ToolBar from './ToolBar/ToolBar';
import ToolBar from '../NewEditor/ToolBar';
import './TemplateEditor.scss';
import MemePopUp from './MemePopUp';
import { useRef } from 'react';

export const DEFAULT_TEXT_BOXES_DATA = {
  text: 'WRITE YOUR TEXT HERE',
  y: 0,
  x: 0,
  height: 50,
  width: 365,
  color: '#FFFFFF',
  outlineColor: '#000000',
  opacity: 100,
  backgroundColor: '#FFFFFF',
  backgroundOpacity: 0,
  fontSize: 32,
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

  // We need to update imageRef when component is rendered
  // This is the first solution I came up with
  const updateComponent = useState(0)[1];
  const imageRef = useRef(null);
  const image = (
    <img
      src={template.url}
      ref={(ref) => {
        updateComponent(1);
        imageRef.current = ref;
      }}
      alt="Template"
      className="canvas__img"
    />
  );

  const [textBoxesData, setTextBoxesData] = useState(
    JSON.parse(sessionStorage.getItem(template.url)) || [
      DEFAULT_TEXT_BOXES_DATA
    ]
  );

  const closeEditor = () => {
    sessionStorage.setItem(template.url, JSON.stringify(textBoxesData));
    closeEditor_();
  };

  return (
    <TextBoxContext.Provider value={{ textBoxesData, setTextBoxesData }}>
      <div className="template-editor">
        <ToolBar
          selectedTextBoxIndexState={[
            selectedTextBoxIndex,
            setSelectedTextBoxIndex
          ]}
          generateMeme={() => setMemeGenerated(true)}
          closeEditor={closeEditor}
          image={imageRef.current}
        />
        <Canvas
          image={image}
          selectedTextBoxIndexState={[
            selectedTextBoxIndex,
            setSelectedTextBoxIndex
          ]}
          handleModifySidebarParams={() => {}}
        />
        {memeGenerated && (
          <MemePopUp
            image={imageRef.current}
            handleCloseButtonClick={() => setMemeGenerated(false)}
          />
        )}
      </div>
    </TextBoxContext.Provider>
  );
}
