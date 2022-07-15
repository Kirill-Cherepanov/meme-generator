import React, { useState, createContext } from 'react';
import Canvas from './Canvas';
import ToolSidebar from './ToolSidebar';
import './TemplateEditor.scss';
import MemePage from './MemePage';
import { useRef } from 'react';

export const TextBoxContext = createContext([]);

export default function TemplateEditor({ template, closeEditor }) {
  const [selectedTextBox, setSelectedTextBox] = useState();
  const [memeGenerated, setMemeGenerated] = useState(false);

  const imageRef = useRef(null);
  const image = <MemeImage imgURL={template.url} imageRef={imageRef} />;
  const imageSize = { width: template.width, height: template.height };

  const [textBoxesData, setTextBoxesData] = useState([
    {
      text: 'WRITE YOUR TEXT HERE',
      x: 0,
      y: 0,
      height: 50,
      width: 400,
      color: '#FFFFFF',
      outlineColor: '#000000',
      backgroundColor: 'transparent',
      fontSize: '32px',
      fontFamily: 'Roboto'
    }
  ]);

  return (
    <TextBoxContext.Provider value={{ textBoxesData, setTextBoxesData }}>
      <div className="template-editor">
        <Canvas
          image={image}
          handleSelection={setSelectedTextBox}
          handleModifySidebarParams={() => {}}
        />
        <ToolSidebar
          selectedTextBox={selectedTextBox}
          generateMeme={() => setMemeGenerated(true)}
          closeEditor={closeEditor}
        />
        {memeGenerated && (
          <MemePage
            image={imageRef.current}
            imageSize={imageSize}
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
