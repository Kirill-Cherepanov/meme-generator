import React, { useEffect, useState } from 'react';
import './App.scss';
import 'normalize.css';
import TemplateChoose from './components/TemplateChoose';
import PopularMemes from './components/PopularMemes';
import TemplateEditor from './components/TemplateEditor';
import Footer from './components/Footer';

const AMOUNT_OF_FETCHED_MEMES = 10;
const API_URL = 'https://api.imgflip.com/get_memes';

function App() {
  const [isPopularMemesOpen, setPopularsMemesOpen] = useState(false);
  const [template, setTemplate] = useState();
  const [memes, setMemes] = useState(getTemplatesExample());

  const openPopularMemes = () => setPopularsMemesOpen(true);
  const closePopularMemes = () => setPopularsMemesOpen(false);
  const chooseMemesHandler = (meme) => {
    setTemplate(meme);
    setPopularsMemesOpen(false);
  };

  // useEffect(() => {
  //   const fetchMemes = async () => {
  //     const memesData = await (await fetch(API_URL)).json();
  //     if (!memesData.success) throw Error("Couldn't access api.imgflip.com !");
  //     setMemes(memesData.data.memes.slice(0, AMOUNT_OF_FETCHED_MEMES));
  //   };
  //   fetchMemes();
  // }, []);

  return (
    <>
      {template ? (
        <TemplateEditor template={template} />
      ) : (
        <TemplateChoose openPopularMemes={openPopularMemes} />
      )}

      {isPopularMemesOpen ? (
        <PopularMemes
          memes={memes}
          chooseMemesHandler={chooseMemesHandler}
          closeMenuHandler={closePopularMemes}
        />
      ) : undefined}

      <Footer />
    </>
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

// # TemplateChoose
//   Upload a new template
//   Choose from popular templates

// # ToolSidebar (retractable on mobile)
//   Change template
//   Set margins (Didn't find this option in API. Could be that we need to set negative x, y in (1))
//   Add text 20 is max (1)
//   Generate meme

// # (1) after clicking on a text box these options are added to the ToolSidebar
//   Change color
//   Change outline color
//   Change font
//   Position (it'll be dragable it will show the position here)
//   Width, height

// # Canvas
//   Meme template
//   Draggable mutable (can change width, height and text on canvas (changes are displayed in (1))) text boxes
