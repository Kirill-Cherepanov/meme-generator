import React, { useState } from 'react';
import Canvas from './Canvas';
import ToolSidebar from './ToolSidebar';
import './TemplateEditor.scss';
import MemePage from './MemePage';
import { useRef } from 'react';

export default function TemplateEditor({ template }) {
  const [selectedTextBox, selectTextBox] = useState();
  const [memeGenerated, setMemeGenerated] = useState(false);
  const imageRef = useRef(null);

  const image = <MemeImage imgURL={template.url} imageRef={imageRef} />;

  return (
    <>
      <div className="template-editor">
        <Canvas
          image={image}
          handleSelection={selectTextBox}
          handleModifySidebarParams={() => {}}
        />
        <ToolSidebar
          selectedTextBoxInfo={selectedTextBox}
          handleGenerateButtonClick={() => setMemeGenerated(true)}
        />
        {memeGenerated ? <MemePage image={imageRef.current} /> : undefined}
      </div>
    </>
  );
}

function MemeImage({ imgURL, imageRef }) {
  return (
    <img src={imgURL} ref={imageRef} alt="Template" className="canvas__img" />
  );
}
