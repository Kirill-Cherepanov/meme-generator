import { useReducer } from 'react';

export const TEXT_MAX_VALUES = {
  fontSize: 100,
  opacity: 100,
  backgroundOpacity: 100
};

const DEFAULT_TEXT_BOXES_DATA = {
  text: 'WRITE YOUR TEXT HERE',
  y: 0,
  x: 0,
  height: window.innerWidth > 450 ? 50 : 35,
  width:
    window.innerWidth > 900
      ? 365
      : window.innerWidth > 600
      ? 300
      : window.innerHeight > 450
      ? 240
      : 200,
  color: '#FFFFFF',
  outlineColor: '#000000',
  opacity: 100,
  backgroundColor: '#FFFFFF',
  backgroundOpacity: 0,
  fontSize:
    window.innerWidth > 900
      ? 32
      : window.innerWidth > 600
      ? 26
      : window.innerWidth > 450
      ? 20
      : 16,
  fontFamily: 'Roboto',
  textMods: {
    bold: false,
    italic: false,
    underlined: false,
    crossed: false
  },
  alignment: 'center'
};

const updateValues = (textBoxesData, values, index) => {
  const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));

  Object.keys(values).forEach((type) => {
    if (['underlined', 'crossed', 'italic', 'bold'].includes(type)) {
      const value = textBoxesData[index].textMods[type];
      if (type === 'underlined') {
        newTextBoxesData[index].textMods.crossed = false;
      }
      if (type === 'crossed') {
        newTextBoxesData[index].textMods.underlined = false;
      }
      return (newTextBoxesData[index].textMods[type] = !value);
    }
    const value = values[type];
    newTextBoxesData[index][type] = isNumeric(value) ? Number(value) : value;
  });

  return newTextBoxesData;
};

const checkValue = (textBoxData, values, target) => {
  const type = Object.keys(values)[0];
  const value = values[type];

  if (TEXT_MAX_VALUES[type] !== undefined && TEXT_MAX_VALUES[type] < value) {
    target.value = textBoxData[type];
    return false;
  }
  return true;
};

const reducer = (textBoxesData, action) => {
  const { values, index, target } = action.payload;
  const textBoxData = textBoxesData[index];

  switch (action.type) {
    case 'reset':
      return [];
    case 'delete':
      return [
        ...textBoxesData.slice(0, index),
        null,
        ...textBoxesData.slice(index + 1)
      ];
    case 'add':
      return [...textBoxesData, DEFAULT_TEXT_BOXES_DATA];
    case 'check':
      if (!checkValue(textBoxData, values, target)) return textBoxesData;
      return updateValues(textBoxesData, values, index);
    case 'update':
      return updateValues(textBoxesData, values, index);
    default:
      throw Error('Unknown action type!');
  }
};

export default function useTextBoxData(initialValue) {
  // initialValue can be null instead of undefined so it's better to check it this way
  if (!initialValue) initialValue = [DEFAULT_TEXT_BOXES_DATA];

  const [textBoxesData, dispatch] = useReducer(reducer, initialValue);
  return [textBoxesData, dispatch];
}

function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
