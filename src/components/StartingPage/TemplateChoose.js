import React from 'react';
import StyledButton from '../App/StyledButton';
import BlobButton from '../App/BlobButton';
import './TemplateChoose.scss';

export default function TemplateChoose({
  openPopularMemes,
  uploadImageHandler
}) {
  return (
    <div className="starting">
      <h1 className="starting__title">MEME GENERATOR</h1>
      <h2 className="starting__desc">
        Create memes from your own images or use popular templates.
        <br />
        Edit your template and generate a meme.
      </h2>
      <div className="starting__buttons">
        <BlobButton
          className={'starting__popular-memes-btn'}
          clickHandler={openPopularMemes}
        >
          Popular meme templates
        </BlobButton>
        {/* <StyledButton
          buttonStyle="primary"
          buttonSize={'L'}
          clickHandler={openPopularMemes}
        >
          Popular meme templates
        </StyledButton> */}
        <StyledButton
          buttonStyle="secondary"
          buttonSize={'L'}
          clickHandler={uploadImageHandler}
        >
          Upload image
        </StyledButton>
      </div>
    </div>
  );
}
