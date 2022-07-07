import React from 'react';
import './PopularMemes.scss';
import StyledButton from './StyledButton';

// const templateDataExample = {
//   id: '61579',
//   name: 'One Does Not Simply',
//   url: 'https://i.imgflip.com/1bij.jpg',
//   width: 568,
//   height: 335,
//   box_count: 2
// };

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
        <StyledButton
          buttonStyle="primary"
          buttonSize="S"
          className="template-menu__choose-meme-btn"
          clickHandler={() => chooseMemesHandler(meme)}
        >
          USE THIS TEMPLATE
        </StyledButton>
      </figure>
    );
  });

  return (
    <div className="template-menu">
      <h2 className="template-menu__title">Select meme template</h2>
      <button className="template-menu__close-menu" onClick={closeMenuHandler}>
        &times;
      </button>
      <div className="template-menu__meme-container">{memeElements}</div>
    </div>
  );
}
