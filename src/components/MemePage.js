import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const textBoxesExample = [
  // ...
  {
    text: 'Write your text here',
    x: 0,
    y: 0,
    width: 200,
    font: '16px Roboto',
    color: '#FFF',
    outLineColor: '#000',
    outLineWidth: '1px'
  },
  {
    text: 'Write your text now',
    x: 0,
    y: 30,
    width: 200,
    font: '16px Roboto',
    color: '#FFF',
    outLineColor: '#000',
    outLineWidth: '1px'
  }
  // ...
];

export default function MemePage({
  children,
  imgPath,
  textBoxes = textBoxesExample
}) {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(window);

  useEffect(() => {
    let isRelevant = true;

    const createContainer = async () => {
      const imgURL = await getMemeURL(imgPath, textBoxes);
      const iframe = document.createElement('iframe');
      iframe.title = 'Meme image';
      iframe.src = imgURL;
      iframe.style.border = '0';
      iframe.style.top = '0px';
      iframe.style.left = '0px';
      iframe.style.bottom = '0px';
      iframe.style.right = '0px';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.allowFullScreen = true;

      if (isRelevant) setContainer(iframe);
    };
    createContainer();

    return () => (isRelevant = false);
  }, [imgPath, textBoxes]);

  useEffect(() => {
    if (!container) return;

    newWindow.current = window.open();
    newWindow.current.document.body.appendChild(container);

    const curWindow = newWindow.current;
    return () => curWindow.close();
  }, [container]);

  return container && createPortal(children, container);
}

async function getMemeURL(imgPath, textBoxes) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imgPath;
  await img.decode();

  context.drawImage(img, 0, 0);
  context.lineWidth = 1;
  context.fillStyle = '#CC00FF';
  context.lineStyle = '#ffff00';
  context.font = '18px sans-serif';
  context.fillText('TEXTEXTEXT', 50, 50);

  console.log(canvas.toDataURL('image/png'));
  return canvas.toDataURL('image/png');
}
