import { useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import StyledButton from '../App/StyledButton';
import { TextBoxContext } from './TemplateEditor';
import './MemePopUp.scss';

const fillBackgroundIntoCanvas = (context, textBoxData) => {
  let { x, y, width, height, backgroundColor, backgroundOpacity } = textBoxData;

  context.fillStyle = backgroundColor;
  context.globalAlpha = backgroundOpacity;
  context.fillRect(x, y, width, height);
  context.globalAlpha = 1.0;
};

const fillTextIntoCanvas = (context, boxData, text, y) => {
  let { x, width, color, outlineColor, fontSize, fontFamily } = boxData;

  // Need to add 5 to x and y due to specifics of Rnd component.
  // It adds a div for resizing on top with height of 10px
  // and calculates y position from the middle of this resize div.
  // Although there are some margins of error there
  // so positioning usually isn't perfect.
  x += 5;
  y += 5;

  // .textAlign is quirky so we have to adjust for it. For more:
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign#result
  context.textAlign = 'center';
  x += width / 2;
  context.textBaseline = 'top';

  context.font = fontSize + 'px ' + fontFamily;
  context.lineWidth = 2; // 1 was almost non-existent smh
  context.shadowColor = outlineColor;
  context.strokeText(text, x, y);
  context.fillStyle = color;
  context.fillText(text, x, y);
};

export default function MemePage({ image, handleCloseButtonClick }) {
  const { textBoxesData: textBoxesData_ } = useContext(TextBoxContext);
  const textBoxesData = JSON.parse(JSON.stringify(textBoxesData_));

  const imageSize = {
    width: image.getBoundingClientRect().width,
    height: image.getBoundingClientRect().height
  };

  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    context.drawImage(image, 0, 0, imageSize.width, imageSize.height);

    textBoxesData.forEach((textBoxData) => {
      const boxData = {
        x: textBoxData.x,
        width: textBoxData.width,
        height: textBoxData.height,
        color: textBoxData.color,
        outlineColor: textBoxData.outlineColor,
        fontSize: textBoxData.fontSize,
        fontFamily: textBoxData.fontFamily,
        backgroundOpacity: textBoxData.backgroundOpacity,
        backgroundColor: textBoxData.backgroundColor
      };

      fillBackgroundIntoCanvas(context, textBoxData);

      const boundFillTextIntoCanvas = fillTextIntoCanvas.bind(
        this,
        context,
        boxData
      );
      addText(context, textBoxData, boundFillTextIntoCanvas);
    });
  }, [image, imageSize.height, imageSize.width, textBoxesData]);

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

function addText(context, textBoxData, fillTextIntoCanvas) {
  let { text, y, width, fontSize, fontFamily } = textBoxData;

  context.font = fontSize + 'px ' + fontFamily;

  const metrics = context.measureText(' ');
  const lineHeight =
    metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

  const lines = text.split('\n');

  for (let line of lines) {
    const words = line.split(' ');
    let isFirstInLine = true;
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      currentLine += word;

      if (isFirstInLine && context.measureText(currentLine).width > width) {
        const { newY, newLine } = printHugeWord(
          context,
          word,
          width,
          y,
          lineHeight,
          fillTextIntoCanvas
        );

        y = newY;
        currentLine = newLine ? newLine + ' ' : '';
        isFirstInLine = !newLine;
      } else if (context.measureText(currentLine + ' ' + word).width > width) {
        fillTextIntoCanvas(currentLine, y);
        y += lineHeight;
        currentLine = '';
        isFirstInLine = true;
      } else {
        currentLine += ' ';
        isFirstInLine = false;
      }
    }

    fillTextIntoCanvas(currentLine, y);
    y += lineHeight;
  }
}

function printHugeWord(
  context,
  word,
  width,
  y,
  lineHeight,
  fillTextIntoCanvas
) {
  for (let i = 1; i <= word.length; i++) {
    if (context.measureText(word.slice(0, i)).width > width) {
      fillTextIntoCanvas(word.slice(0, i - 1), y);
      return printHugeWord(
        context,
        word.slice(i - 1),
        width,
        y + lineHeight,
        lineHeight,
        fillTextIntoCanvas
      );
    }
  }

  return { newY: y, newLine: word };
}
