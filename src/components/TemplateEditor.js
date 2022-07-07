import React, { useState } from 'react';
import Canvas from './Canvas';
import ToolSidebar from './ToolSidebar';

export default function TemplateEditor({ template }) {
  const [selectedTextBox, selectTextBox] = useState();
  return (
    <>
      <div className="template-editor">
        <Canvas
          templateData={template}
          handleSelection={selectTextBox}
          handleModifySidebarParams={() => {}}
        />
        <ToolSidebar selectedTextBoxInfo={selectedTextBox} />
      </div>
    </>
  );
}
