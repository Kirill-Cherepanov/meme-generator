import React, { useState } from 'react';
import Canvas from './Canvas';
import ToolSidebar from './ToolSidebar';
import './TemplateEditor.scss';
import MemePage from './MemePage';
import { useRef } from 'react';

export default function TemplateEditor({ template, closeEditor }) {
  const [, selectTextBox] = useState();
  const [memeGenerated, setMemeGenerated] = useState(false);

  const imageRef = useRef(null);
  const image = <MemeImage imgURL={template.url} imageRef={imageRef} />;
  const imageSize = { width: template.width, height: template.height };

  const [textBoxesData, setTextBoxesData] = useState([
    {
      x: 0,
      y: 0
    }
  ]);
  const handleChangePos = () => {};

  return (
    <>
      <div className="template-editor">
        <Canvas
          image={image}
          handleSelection={selectTextBox}
          handleModifySidebarParams={() => {}}
        />
        <ToolSidebar
          // selectedTextBoxInfo={selectedTextBox}
          generateMeme={() => setMemeGenerated(true)}
          closeEditor={closeEditor}
        />
        {memeGenerated ? (
          <MemePage
            image={imageRef.current}
            imageSize={imageSize}
            handleCloseButtonClick={() => setMemeGenerated(false)}
          />
        ) : undefined}
      </div>
    </>
  );
}

function MemeImage({ imgURL, imageRef }) {
  return (
    <img src={imgURL} ref={imageRef} alt="Template" className="canvas__img" />
  );
}
