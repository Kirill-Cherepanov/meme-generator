import React, { useState } from 'react';
import Canvas from './Canvas';
import ToolSidebar from './ToolSidebar';
import './TemplateEditor.scss';
import MemePage from './MemePage';

export default function TemplateEditor({ template }) {
  const [selectedTextBox, selectTextBox] = useState();
  const [memeGenerated, setMemeGenerated] = useState(false);

  return (
    <>
      <div className="template-editor">
        <Canvas
          templateData={template}
          handleSelection={selectTextBox}
          handleModifySidebarParams={() => {}}
        />
        <ToolSidebar
          selectedTextBoxInfo={selectedTextBox}
          handleGenerateButtonClick={() => setMemeGenerated(true)}
        />
        {memeGenerated ? (
          <MemePage imgPath="https://i.imgflip.com/3lmzyx.jpg" />
        ) : undefined}
      </div>
    </>
  );
}
