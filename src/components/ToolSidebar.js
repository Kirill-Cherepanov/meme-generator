import React, { useContext } from 'react';
import StyledButton from './StyledButton';
import TextBoxModify from './TextBoxModify';
import './ToolSidebar.scss';
import { TextBoxContext } from './TemplateEditor';

export default function ToolSidebar({
  selectedTextBox,
  generateMeme,
  closeEditor
}) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);

  return (
    <div className="tools">
      <h2 className="tools__title">MEME EDITOR</h2>
      <div className="tools__main-buttons">
        <StyledButton
          buttonStyle="option"
          buttonSize="M"
          className="btn-template"
          clickHandler={closeEditor}
        >
          CHANGE TEMPLATE
        </StyledButton>
        <StyledButton
          buttonStyle="option"
          buttonSize="M"
          className="btn-text"
          clickHandler={() => {
            const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
            newTextBoxesData[textBoxesData.length] = { x: 0, y: 0, height: 50 };
            setTextBoxesData(newTextBoxesData);
          }}
        >
          ADD TEXT
        </StyledButton>
      </div>
      {selectedTextBox !== undefined && (
        <TextBoxModify selectedIndex={selectedTextBox} />
      )}
      <StyledButton
        buttonStyle="primary"
        buttonSize="L"
        className="btn-generate"
        clickHandler={generateMeme}
      >
        GENERATE MEME
      </StyledButton>
    </div>
  );
}

// # ToolSidebar (retractable on mobile)
//   Change template
//   Add text 20 is max (1)
//   Generate meme
//   After clicking on a text box TextBoxModify is added to the ToolSidebar
// ? Set margins (Didn't find this option in API. Could be that we need to set negative x, y in (1))
