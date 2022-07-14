import { useEffect, useRef } from 'react';
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

export default function MemePage({ image, textBoxes = textBoxesExample }) {
  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    context.drawImage(image, 0, 0);
    context.lineWidth = 1;
    context.fillStyle = '#CC00FF';
    context.lineStyle = '#ffff00';
    context.font = '18px sans-serif';
    context.fillText(textBoxes[0].text, 50, 50);
  }, [image, textBoxes]);

  return createPortal(
    <canvas id="rendered-meme" ref={canvas} />,
    document.getElementById('meme')
  );
}
