import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import StyledButton from './StyledButton';
import './MemePage.scss';

const textBoxesExample = [
  // ...
  {
    text: 'Write your text here',
    x: 0,
    y: 150,
    width: 200,
    lineHeight: 18,
    font: '16px Roboto',
    color: '#FFF',
    outlineColor: '#000',
    outlineWidth: '100px'
  },
  {
    text: `Write your text now`,
    x: 0,
    y: 30,
    width: 200,
    lineHeight: 18,
    font: '16px Roboto',
    color: '#FFF',
    outlineColor: '#000',
    outlineWidth: '1px'
  }
  // ...
];

export default function MemePage({
  image,
  imageSize,
  handleCloseButtonClick,
  textBoxes = textBoxesExample
}) {
  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    context.drawImage(image, 0, 0);

    textBoxes.forEach((textBox) => {
      addText(context, textBox);
    });
  }, [image, textBoxes]);

  return createPortal(
    <div className="meme">
      <canvas
        id="rendered-meme"
        ref={canvas}
        width={imageSize.width}
        height={imageSize.height}
      />
      <div className="meme__buttons">
        <StyledButton
          className="meme__download"
          buttonStyle="primary"
          buttonSize="L"
        >
          DOWNLOAD
        </StyledButton>
        <StyledButton
          className="meme__close"
          buttonStyle="secondary"
          buttonSize="L"
          clickHandler={handleCloseButtonClick}
        >
          CLOSE
        </StyledButton>
      </div>
    </div>,
    document.getElementById('meme')
  );
}

function addText(
  context,
  { text, x, y, width, lineHeight, font, color, outlineColor, outlineWidth }
) {
  width = width || 0;

  if (width <= 0) {
    context.fillText(text, x, y);
    return;
  }

  for (let i = 1; i <= text.length; i++) {
    const str = text.substr(0, i);
    if (context.measureText(str).width > width) {
      context.lineWidth = outlineWidth;
      context.fillStyle = color;
      context.lineStyle = outlineColor;
      context.font = font;
      context.fillText(text.substr(0, i - 1), x, y);

      addText(
        context,
        text.substr(i - 1),
        x,
        y + lineHeight,
        lineHeight,
        width
      );

      return;
    }
  }
  context.lineWidth = outlineWidth;
  context.fillStyle = color;
  context.lineStyle = outlineColor;
  context.font = font;
  context.fillText(text, x, y);
}
