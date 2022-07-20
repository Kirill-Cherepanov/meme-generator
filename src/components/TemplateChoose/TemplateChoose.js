import React from 'react';
import BlobButton from '../BlobButton/BlobButton';
import AnimatedButton from '../AnimatedButton/AnimatedButton';
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
          className="starting__popular-memes-btn"
          clickHandler={openPopularMemes}
        >
          Popular meme templates
        </BlobButton>
        <AnimatedButton
          className="starting__upload-btn"
          clickHandler={uploadImageHandler}
        >
          Upload image
        </AnimatedButton>
      </div>
    </div>
  );
}
