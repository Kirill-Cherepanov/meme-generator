import React, { useState, useEffect } from 'react';
import GlowingButton from '../GlowingButton/GlowingButton';
import './PopularMemes.scss';

const AMOUNT_OF_FETCHED_MEMES = 100;
const API_URL = 'https://api.imgflip.com/get_memes';

const fetchMemes = async () => {
  const memesData = await (await fetch(API_URL)).json();
  if (!memesData.success) throw Error("Couldn't access api.imgflip.com !");
  return memesData.data.memes.slice(0, AMOUNT_OF_FETCHED_MEMES);
};

export default function PopularMemes({
  memes,
  chooseMemesHandler,
  closeMenuHandler
}) {
  const [memeData, setMemeData] = useState([]);

  useEffect(() => {
    let isUnmounted = false;

    fetchMemes().then((memes) => !isUnmounted && setMemeData(memes));

    return () => (isUnmounted = true);
  }, []);

  const memeElements = memeData.map((meme, index) => {
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

      <div className="template-menu__meme-container">
        {memeData.length !== 0 ? (
          memeElements
        ) : (
          <div className="template-menu__loading">
            <div class="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
