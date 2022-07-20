import React, { useState, useEffect } from 'react';
import GlowingButton from '../GlowingButton/GlowingButton';
import './PopularMemes.scss';

const AMOUNT_OF_FETCHED_MEMES = 100;
const API_URL = 'https://api.imgflip.com/get_memes';

const fetchMemes = async () => {
  const memesData = await (await fetch(API_URL)).json();
  if (!memesData.success) throw Error("Couldn't access api.imgflip.com !");
  return memesData.data.memes;
};

export default function PopularMemes({ chooseMemesHandler, closeMenuHandler }) {
  const [memeData, setMemeData] = useState([]);
  const [memeAmount, setMemeAmount] = useState(9);

  useEffect(() => {
    let isUnmounted = false;

    fetchMemes().then((memes) => !isUnmounted && setMemeData(memes));

    return () => (isUnmounted = true);
  }, []);

  const memeElements = memeData.slice(0, memeAmount).map((meme, index) => {
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
    <div
      className="template-menu"
      onScroll={function loadMemes(e) {
        if (memeAmount === AMOUNT_OF_FETCHED_MEMES) return;

        const scrollBottom =
          e.target.scrollHeight -
          e.target.scrollTop -
          e.target.getBoundingClientRect().height;

        if (scrollBottom < 200) {
          setMemeAmount((memeAmount) => {
            if (memeAmount + 9 < AMOUNT_OF_FETCHED_MEMES) {
              return memeAmount + 9;
            }
            return AMOUNT_OF_FETCHED_MEMES;
          });
        }
      }}
    >
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
            <div className="lds-roller">
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
