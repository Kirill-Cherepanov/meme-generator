import React, { useRef, useEffect, useContext } from 'react';
import { TextBoxContext } from './TemplateEditor';
import { Rnd } from 'react-rnd';

export default function TextBox({ index, handleSelection }) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);
  const textBoxData = textBoxesData[index];

  const contentRef = useRef();
  const caretPos = useRef();

  useEffect(() => {
    setCaret(contentRef.current.resizableElement.current, caretPos.current);
    contentRef.current.resizableElement.current.focus();
  }, [textBoxData.text]);

  return (
    <Rnd
      ref={contentRef}
      className="canvas__text-box"
      contentEditable={true}
      suppressContentEditableWarning={true}
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
      onInput={(e) => {
        caretPos.current = getCaret(
          contentRef.current.resizableElement.current
        );

        const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
        newTextBoxesData[index].text = e.target.textContent;
        setTextBoxesData(newTextBoxesData);
      }}
    >
      {textBoxData.text}
    </Rnd>
  );
}

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
