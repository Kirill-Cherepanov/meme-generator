import React from 'react';
import StyledButton from './StyledButton';

export default function TemplateChoose() {
  return (
    <div className="starting">
      <h1 className="starting__title">Meme generator</h1>
      <h2 className="starting__desc">
        Create memes from your own images or use popular templates.
        <br />
        Edit your template and generate a meme.
      </h2>
      <StyledButton buttonStyle="primary" size={'L'} clickHandler={() => {}}>
        Select meme template
      </StyledButton>
      <StyledButton buttonStyle="secondary" size={'M'} clickHandler={() => {}}>
        Upload image
      </StyledButton>
    </div>
  );
}

// # TemplateChoose
//   Upload a new template
//   Choose from popular templates
