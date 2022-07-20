import React, { useRef, useEffect, useContext } from 'react';
import { Rnd } from 'react-rnd';
import { TextBoxContext } from '../../../context/TextBoxContext';
import './TextBox.scss';

let timesMoved = 0;

export default function TextBox({ index, selectedTextBoxIndexState }) {
  const [selectedTextBoxIndex, setSelectedTextBoxIndex] =
    selectedTextBoxIndexState;
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);
  const textBoxData = textBoxesData[index];

  const contentRef = useRef();
  const caretPos = useRef();

  useEffect(() => {
    setCaret(contentRef.current, caretPos.current);
    contentRef.current.focus();
  }, [textBoxData.text]);

  return (
    <Rnd
      className={
        'canvas__text-box ' + (index === selectedTextBoxIndex && 'active')
      }
      bounds="parent"
      style={{
        color: textBoxData.color,

        textShadow: `${textBoxData.outlineColor} -1px 0px, ${textBoxData.outlineColor} 0px 1px, ${textBoxData.outlineColor} 1px 0px, ${textBoxData.outlineColor} 0px -1px`,

        opacity: textBoxData.opacity / 100,

        backgroundColor:
          `rgba(${hexToRgb(textBoxData.backgroundColor)}, ` +
          `${textBoxData.backgroundOpacity / 100})`,

        fontSize: `${textBoxData.fontSize}px`,

        fontFamily: textBoxData.fontFamily,

        textDecoration:
          (textBoxData.textMods.underlined && 'underline') ||
          (textBoxData.textMods.crossed && 'line-through'),

        fontStyle: textBoxData.textMods.italic && 'italic',

        fontWeight: textBoxData.textMods.bold && 'bold',

        textAlign: textBoxData.alignment
      }}
      position={{
        x: textBoxData.x,
        y: textBoxData.y
      }}
      size={{
        width: textBoxData.width,
        height: textBoxData.height
      }}
      onDragStart={() => {
        setSelectedTextBoxIndex(index);
      }}
      onResizeStart={() => {
        setSelectedTextBoxIndex(index);
      }}
      onDragStop={(e, d) => {
        setTextBoxesData((textBoxesData) => {
          const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
          newTextBoxesData[index].x = d.x;
          newTextBoxesData[index].y = d.y;
          return newTextBoxesData;
        });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setTextBoxesData((textBoxesData) => {
          const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
          newTextBoxesData[index].width = ref.offsetWidth;
          newTextBoxesData[index].height = ref.offsetHeight;
          newTextBoxesData[index].x = position.x;
          newTextBoxesData[index].y = position.y;
          return newTextBoxesData;
        });
      }}
      allowAnyClick={true}
    >
      <span
        ref={contentRef}
        className="canvas__editable-text"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onTouchStart={() => {
          timesMoved = 0;
        }}
        onTouchMove={() => {
          timesMoved++;
        }}
        onTouchEnd={(e) => {
          if (timesMoved > 7) return true;
          caretPos.current = e.target.childNodes[0].length;
          e.target.focus();
          setCaret(e.target, caretPos.current);
        }}
        onInput={(e) => {
          caretPos.current = getCaret(contentRef.current);

          const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
          if (!e.target.innerText) {
            e.target.innerText = ' ';
          }
          newTextBoxesData[index].text = e.target.innerText;
          setTextBoxesData(newTextBoxesData);
        }}
      >
        {textBoxData.text}
      </span>
    </Rnd>
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return;
  return (
    `${parseInt(result[1], 16)}, ` +
    `${parseInt(result[2], 16)}, ` +
    `${parseInt(result[3], 16)}`
  );
}

// There was a bug when onInput inside Rnd caret was constantly put at the end of text
// This is the fix for it
function getCaret(el) {
  let caretAt = 0;
  const sel = window.getSelection();

  if (sel.rangeCount === 0) {
    return caretAt;
  }

  const range = sel.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.endContainer, range.endOffset);
  caretAt = preRange.toString().length;

  return caretAt;
}

function setCaret(el, offset) {
  let sel = window.getSelection();
  let range = document.createRange();

  range.setStart(el.childNodes[0], offset);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
