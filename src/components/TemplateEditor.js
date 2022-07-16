import React, { useState, createContext } from 'react';
import Canvas from './Canvas';
import ToolSidebar from './ToolSidebar';
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
  backgroundColor: '#FFFFFF',
  backgroundOpacity: 0,
  fontSize: 32,
  fontFamily: 'Roboto'
};

export const TextBoxContext = createContext([]);

export default function TemplateEditor({ template, closeEditor }) {
  const [selectedTextBoxIndex, setSelectedTextBoxIndex] = useState();
  const [memeGenerated, setMemeGenerated] = useState(false);

  const imageRef = useRef(null);
  const image = <MemeImage imgURL={template.url} imageRef={imageRef} />;

  const [textBoxesData, setTextBoxesData] = useState([DEFAULT_TEXT_BOXES_DATA]);

  return (
    <TextBoxContext.Provider value={{ textBoxesData, setTextBoxesData }}>
      <div className="template-editor">
        <Canvas
          image={image}
          handleSelection={setSelectedTextBoxIndex}
          handleModifySidebarParams={() => {}}
        />
        <ToolSidebar
          selectedTextBoxIndex={selectedTextBoxIndex}
          generateMeme={() => setMemeGenerated(true)}
          closeEditor={closeEditor}
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

function MemeImage({ imgURL, imageRef }) {
  return (
    <img src={imgURL} ref={imageRef} alt="Template" className="canvas__img" />
  );
}
