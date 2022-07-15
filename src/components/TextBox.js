import React, { useRef, useEffect, useContext } from 'react';
import { TextBoxContext } from './TemplateEditor';
import { Rnd } from 'react-rnd';
import './TextBox.scss';

export default function TextBox({ index, handleSelection }) {
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
      className="canvas__text-box"
      bounds="parent"
      position={{
        x: textBoxData.x,
        y: textBoxData.y
      }}
      size={{
        width: textBoxData.width,
        height: textBoxData.height
      }}
      onDragStart={() => {
        handleSelection(index);
      }}
      onResizeStart={() => {
        handleSelection(index);
      }}
      onDrag={(e, d) => {
        const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
        newTextBoxesData[index].x = d.x;
        newTextBoxesData[index].y = d.y;
        setTextBoxesData(newTextBoxesData);
      }}
      onResize={(e, direction, ref, delta, position) => {
        const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
        newTextBoxesData[index].width = ref.offsetWidth;
        newTextBoxesData[index].height = ref.offsetHeight;
        newTextBoxesData[index].x = position.x;
        newTextBoxesData[index].y = position.y;
        setTextBoxesData(newTextBoxesData);
      }}
    >
      <span
        ref={contentRef}
        className="canvas__editable-text"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e) => {
          caretPos.current = getCaret(contentRef.current);

          const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));

          if (!e.target.textContent) {
            e.target.textContent = ' ';
            newTextBoxesData[index].text = e.target.textContent;
          } else newTextBoxesData[index].text = e.target.textContent;

          setTextBoxesData(newTextBoxesData);
        }}
      >
        {textBoxData.text}
      </span>
    </Rnd>
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
