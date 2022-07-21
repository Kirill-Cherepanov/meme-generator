import React, { useState } from 'react';
import TemplateChoose from '../TemplateChoose/TemplateChoose';
import Footer from '../Footer/Footer';
import TemplateEditor from '../TemplateEditor/TemplateEditor';
import './App.scss';
import 'normalize.css';
import PopularMemes from '../PopularMemes/PopularMemes';

export default function App() {
  const [isPopularMemesOpen, setPopularsMemesOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [template, setTemplate] = useState();

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

  const uploadImage = () => {
    const input = document.createElement('input');
    input.access = 'image/*';
    input.type = 'file';
    input.onchange = (e) => {
      const image = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result;
        chooseMemesHandler({ url: content });
      };
    };
    input.click();
  };

  return (
    <React.StrictMode>
      {isEditorOpen ? (
        <TemplateEditor template={template} closeEditor={closeEditor} />
      ) : (
        <>
          <TemplateChoose
            openPopularMemes={openPopularMemes}
            uploadImage={uploadImage}
          />
          <Footer />
        </>
      )}

      {isPopularMemesOpen ? (
        <PopularMemes
          chooseMemesHandler={chooseMemesHandler}
          closeMenuHandler={closePopularMemes}
        />
      ) : undefined}
    </React.StrictMode>
  );
}
