import React from 'react';
import StyledButton from './StyledButton';
import TextBoxModify from './TextBoxModify';
import './ToolSidebar.scss';

export default function ToolSidebar({ selectedTextBoxInfo }) {
  return (
    <div className="tools">
      <h2 className="tools__title">MEME EDITOR</h2>
      <div className="tools__main-buttons">
        <StyledButton
          buttonStyle="option"
          buttonSize="M"
          className="btn-template"
          clickHandler={() => {}}
        >
          CHANGE TEMPLATE
        </StyledButton>
        <StyledButton
          buttonStyle="option"
          buttonSize="M"
          className="btn-text"
          clickHandler={() => {}}
        >
          ADD TEXT
        </StyledButton>
      </div>
      <TextBoxModify {...selectedTextBoxInfo} />
      <StyledButton
        buttonStyle="primary"
        buttonSize="L"
        className="btn-generate"
        clickHandler={() => {}}
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
