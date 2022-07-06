import React from 'react';

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
        <button
          className="template-menu__choose-meme-btn"
          onClick={() => chooseMemesHandler(meme)}
        >
          USE THIS TEMPLATE
        </button>
        <img src={meme.url} alt="meme" />
        <figcaption>{meme.name}</figcaption>
      </figure>
    );
  });

  return (
    <div className="template-menu">
      <h2 className="template-menu__title">Select meme template</h2>
      <button className="template-menu__close-menu" onClick={closeMenuHandler}>
        X
      </button>
      <div className="template-menu__meme-container">{memeElements}</div>X
    </div>
  );
}
