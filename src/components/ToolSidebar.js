import React from 'react';
import StyledButton from './StyledButton';
import TextBoxModify from './TextBoxModify';

export default function ToolSidebar({ selectedTextBoxInfo }) {
  return (
    <div className="tools">
      <h2>MEME EDITOR</h2>
      <StyledButton primary="secondary" size={'M'} clickHandler={() => {}}>
        Change Template
      </StyledButton>
      <StyledButton buttonStyle="primary" size={'M'} clickHandler={() => {}}>
        ADD TEXT
      </StyledButton>
      <TextBoxModify {...selectedTextBoxInfo} />
      <StyledButton buttonStyle="primary" size={'L'} clickHandler={() => {}}>
        Generate MEME
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
