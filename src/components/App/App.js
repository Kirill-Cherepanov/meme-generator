import React, { useEffect, useState } from 'react';
import TemplateChoose from '../TemplateChoose/TemplateChoose';
import Footer from '../Footer/Footer';
import TemplateEditor from '../TemplateEditor/TemplateEditor';
import './App.scss';
import 'normalize.css';
const PopularMemes = React.lazy(() => import('../PopularMemes/PopularMemes'));
// import PopularMemes from '../PopularMemes/PopularMemes';

const AMOUNT_OF_FETCHED_MEMES = 100;
const API_URL = 'https://api.imgflip.com/get_memes';

function App() {
  const [isPopularMemesOpen, setPopularsMemesOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [template, setTemplate] = useState();
  const [memes, setMemes] = useState();

  const openPopularMemes = () => setPopularsMemesOpen(true);
  const closePopularMemes = () => setPopularsMemesOpen(false);
  const chooseMemesHandler = (meme) => {
    setTemplate(meme);
    setIsEditorOpen(true);
    setPopularsMemesOpen(false);
  };
  const closeEditor = () => {
    setTemplate(undefined);
    setIsEditorOpen(false);
  };

  useEffect(() => {
    const fetchMemes = async () => {
      const memesData = await (await fetch(API_URL)).json();
      if (!memesData.success) throw Error("Couldn't access api.imgflip.com !");
      setMemes(memesData.data.memes.slice(0, AMOUNT_OF_FETCHED_MEMES));
    };
    fetchMemes();
  }, []);

  return (
    <React.StrictMode>
      {isEditorOpen ? (
        <TemplateEditor template={template} closeEditor={closeEditor} />
      ) : (
        <>
          <TemplateChoose openPopularMemes={openPopularMemes} />
          <Footer />
        </>
      )}

      {isPopularMemesOpen ? (
        <React.Suspense
          fallback={
            <div>
              FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!FUCKED!!
            </div>
          }
        >
          <PopularMemes
            memes={memes}
            chooseMemesHandler={chooseMemesHandler}
            closeMenuHandler={closePopularMemes}
          />
        </React.Suspense>
      ) : undefined}
    </React.StrictMode>
  );
}

export default App;

function getTemplatesExample() {
  return [
    {
      id: '181913649',
      name: 'Drake Hotline Bling',
      url: 'https://i.imgflip.com/30b1gx.jpg',
      width: 1200,
      height: 1200,
      box_count: 2
    },
    {
      id: '87743020',
      name: 'Two Buttons',
      url: 'https://i.imgflip.com/1g8my4.jpg',
      width: 600,
      height: 908,
      box_count: 3
    },
    {
      id: '112126428',
      name: 'Distracted Boyfriend',
      url: 'https://i.imgflip.com/1ur9b0.jpg',
      width: 1200,
      height: 800,
      box_count: 3
    },
    {
      id: '131087935',
      name: 'Running Away Balloon',
      url: 'https://i.imgflip.com/261o3j.jpg',
      width: 761,
      height: 1024,
      box_count: 5
    },
    {
      id: '217743513',
      name: 'UNO Draw 25 Cards',
      url: 'https://i.imgflip.com/3lmzyx.jpg',
      width: 500,
      height: 494,
      box_count: 2
    },
    {
      id: '124822590',
      name: 'Left Exit 12 Off Ramp',
      url: 'https://i.imgflip.com/22bdq6.jpg',
      width: 804,
      height: 767,
      box_count: 3
    },
    {
      id: '247375501',
      name: 'Buff Doge vs. Cheems',
      url: 'https://i.imgflip.com/43a45p.png',
      width: 937,
      height: 720,
      box_count: 4
    },
    {
      id: '129242436',
      name: 'Change My Mind',
      url: 'https://i.imgflip.com/24y43o.jpg',
      width: 482,
      height: 361,
      box_count: 2
    },
    {
      id: '222403160',
      name: 'Bernie I Am Once Again Asking For Your Support',
      url: 'https://i.imgflip.com/3oevdk.jpg',
      width: 750,
      height: 750,
      box_count: 2
    }
  ];
}
