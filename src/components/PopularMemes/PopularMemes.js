import React from 'react';
import GlowingButton from '../GlowingButton/GlowingButton';
import './PopularMemes.scss';

export default function PopularMemes({
  memes,
  chooseMemesHandler,
  closeMenuHandler
}) {
  const memeElements = memes.map((meme, index) => {
    return (
      <figure className="template-menu__meme" key={index}>
        <figcaption className="template-menu__caption">{meme.name}</figcaption>
        <img src={meme.url} alt="meme" className="template-menu__img" />
        <GlowingButton
          className="template-menu__choose-meme-btn"
          clickHandler={() => chooseMemesHandler(meme)}
        >
          USE THIS TEMPLATE
        </GlowingButton>
      </figure>
    );
  });

  return (
    <div className="template-menu">
      <div className="template-menu__header">
        <h2 className="template-menu__title">Select meme template</h2>
        <button
          className="template-menu__close-menu"
          onClick={closeMenuHandler}
        >
          &times;
        </button>
      </div>

      <div className="template-menu__meme-container">{memeElements}</div>
    </div>
  );
}
