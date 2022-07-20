import { useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { TextBoxContext } from './TemplateEditor';
import './MemePopUp.scss';

const fillBackgroundIntoCanvas = (context, textBoxData) => {
  let { x, y, width, height, backgroundColor, backgroundOpacity, opacity } =
    textBoxData;

  context.fillStyle = backgroundColor;
  context.globalAlpha = (backgroundOpacity / 100) * (opacity / 100);
  context.fillRect(x, y, width, height);
  context.globalAlpha = opacity;
};

const fillTextIntoCanvas = (context, boxData, text, y) => {
  let {
    x,
    width,
    color,
    outlineColor,
    fontSize,
    fontFamily,
    textMods,
    opacity,
    alignment
  } = boxData;

  context.globalAlpha = opacity / 100;

  // Need to add 5 to x and y due to specifics of Rnd component.
  // It adds a div for resizing on top with height of 10px
  // and calculates y position from the middle of this resize div.
  // Although there are some margins of error there
  // so positioning usually isn't perfect.
  x += 5;
  y += 5;

  // .textAlign is quirky so we have to adjust for it. For more:
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign#result

  context.textAlign = alignment;
  context.textBaseline = 'top';
  context.font =
    (textMods.bold ? 'bold ' : '') +
    (textMods.italic ? 'italic ' : '') +
    (fontSize + 'px ' + fontFamily);

  const metrics = context.measureText(text);
  const actualWidth = metrics.width;
  const lineHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  let textStartX;

  const switchAlignment = {
    left: () => {
      textStartX = x;
    },
    center: () => {
      x += width / 2;
      textStartX = x - actualWidth / 2;
    },
    right: () => {
      x += width;
      textStartX = x - actualWidth;
    }
  };

  switchAlignment[alignment]();

  context.lineWidth = 2; // 1 was almost non-existent smh
  context.shadowColor = outlineColor;
  context.strokeText(text, x, y);

  context.fillStyle = color;
  context.fillText(text, x, y);

  context.lineWidth = 1;
  context.strokeStyle = outlineColor;

  if (textMods.underlined) {
    context.fillRect(
      textStartX,
      y + lineHeight + 3,
      actualWidth,
      lineHeight / 6
    );

    context.strokeRect(
      textStartX,
      y + lineHeight + 3,
      actualWidth,
      lineHeight / 6
    );
  }

  if (textMods.crossed) {
    context.fillRect(
      textStartX,
      y + lineHeight / 2,
      actualWidth,
      lineHeight / 6
    );

    context.strokeRect(
      textStartX,
      y + lineHeight / 2,
      actualWidth,
      lineHeight / 6
    );
  }
};

export default function MemePopUp({ image, setDownloadMeme, filters }) {
  const { textBoxesData } = useContext(TextBoxContext);

  const imageSize = {
    width: image.getBoundingClientRect().width,
    height: image.getBoundingClientRect().height
  };

  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');

    context.filter = `hue-rotate(${filters.hueRotate}deg) saturate(${filters.saturation}%) brightness(${filters.brightness}%) blur(${filters.blur}px) sepia(${filters.sepia}%)`;
    context.drawImage(image, 0, 0, imageSize.width, imageSize.height);
    context.filter = 'none';

    textBoxesData.forEach((textBoxData_) => {
      const textBoxData = JSON.parse(JSON.stringify(textBoxData_));
      if (textBoxData === null) return;

      let boxData = {};
      const keys = [
        'x',
        'width',
        'height',
        'color',
        'outlineColor',
        'fontSize',
        'fontFamily',
        'backgroundOpacity',
        'backgroundColor',
        'textMods',
        'opacity',
        'alignment'
      ];
      keys.forEach((key) => (boxData[key] = textBoxData[key]));

      fillBackgroundIntoCanvas(context, textBoxData);

      const boundFillTextIntoCanvas = fillTextIntoCanvas.bind(
        this,
        context,
        boxData
      );
      addText(context, textBoxData, boundFillTextIntoCanvas);
    });

    setDownloadMeme(() => {
      return () => {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.current.toDataURL();
        link.click();
      };
    });
  }, [
    filters,
    image,
    imageSize.height,
    imageSize.width,
    setDownloadMeme,
    textBoxesData
  ]);

  return createPortal(
    <div className="meme-container">
      <div className="meme-wrapper">
        <canvas
          id="rendered-meme"
          ref={canvas}
          width={imageSize.width}
          height={imageSize.height}
        />
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
