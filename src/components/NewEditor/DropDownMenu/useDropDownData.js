import { useContext, useState, useEffect } from 'react';
import { TextBoxContext } from '../../Editor/TemplateEditor';

function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

export default function useDropDownData(selectedIndex, image) {
  const { textBoxesData, setTextBoxesData } = useContext(TextBoxContext);
  const textBoxData = textBoxesData[selectedIndex];
  // console.log(textBoxData);

  const [maxValues, setMaxValues] = useState();
  useEffect(() => {
    const updateMaxValues = () => {
      const imageWidth = image.getBoundingClientRect().width;
      const imageHeight = image.getBoundingClientRect().height;
      setMaxValues({
        x: imageWidth,
        y: imageHeight,
        width: imageWidth,
        height: imageHeight,
        fontSize: imageWidth / 4,
        opacity: 100,
        backgroundOpacity: 100
      });
    };
    updateMaxValues();

    window.addEventListener('resize', updateMaxValues);

    return () => window.removeEventListener('resize', updateMaxValues);
  }, [image]);

  const updateValue = (e, type) => {
    const value = isNumeric(e.target.value)
      ? Number(e.target.value)
      : e.target.value;

    if (maxValues[type] !== undefined && maxValues[type] < value) {
      e.target.value = textBoxData[type];
      return;
    }

    const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
    newTextBoxesData[selectedIndex][type] = value;
    setTextBoxesData(newTextBoxesData);
  };

  const toggleTextModifiers = (type) => {
    const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));

    if (type === 'underlined' && !textBoxData.textMods.underlined) {
      newTextBoxesData[selectedIndex].textMods.crossed = false;
    }
    if (type === 'crossed' && !textBoxData.textMods.crossed) {
      newTextBoxesData[selectedIndex].textMods.underlined = false;
    }

    newTextBoxesData[selectedIndex].textMods[type] =
      !textBoxData.textMods[type];
    setTextBoxesData(newTextBoxesData);
  };

  return {
    font: {
      range: [
        {
          label: 'Font Size',
          min: 0,
          max: 128,
          numberLabel: 'px',
          value: textBoxData.fontSize,
          inputHandler: (e) => updateValue(e, 'fontSize')
        }
      ],
      list: [
        {
          label: 'Font Family',
          items: ['sans-serif', 'serif', 'Roboto', 'Will add later!'],
          value: textBoxData.fontFamily,
          inputHandler: (e) => updateValue(e, 'fontFamily')
        }
      ]
    },

    mods: {
      buttons: [
        {
          label: 'Text Modifiers',
          buttons: [
            {
              path: '../../../icons/template.png',
              isActive: textBoxData.textMods.bold,
              inputHandler: () => toggleTextModifiers('bold')
            },
            {
              path: '../../../icons/template.png',
              isActive: textBoxData.textMods.italic,
              inputHandler: () => toggleTextModifiers('italic')
            },
            {
              path: '../../../icons/template.png',
              isActive: textBoxData.textMods.underlined,
              inputHandler: () => toggleTextModifiers('underlined')
            },
            {
              path: '../../../icons/template.png',
              isActive: textBoxData.textMods.crossed,
              inputHandler: () => toggleTextModifiers('crossed')
            }
          ]
        }
      ]
    },

    color: {
      color: [
        {
          label: 'Text Color',
          value: textBoxData.color,
          inputHandler: (e) => updateValue(e, 'color')
        },
        {
          label: 'Outline Color',
          value: textBoxData.outlineColor,
          inputHandler: (e) => updateValue(e, 'outlineColor')
        }
      ]
    },

    background: {
      color: [
        {
          label: 'Background Color',
          value: textBoxData.backgroundColor,
          inputHandler: (e) => updateValue(e, 'backgroundColor')
        }
      ],
      range: [
        {
          label: 'Background Opacity',
          min: 0,
          max: 100,
          numberLabel: '%',
          value: textBoxData.backgroundOpacity,
          inputHandler: (e) => updateValue(e, 'backgroundOpacity')
        }
      ]
    },

    opacity: {
      range: [
        {
          label: 'Opacity',
          min: 0,
          max: 100,
          numberLabel: '%',
          value: textBoxData.opacity,
          inputHandler: (e) => updateValue(e, 'opacity')
        }
      ]
    },

    alignment: {
      buttons: [
        {
          label: 'Text Alignment',
          buttons: [
            {
              path: '../../../icons/template.png',
              value: 'left',
              isActive: textBoxData.alignment === 'left',
              inputHandler: (e) => updateValue(e, 'alignment')
            },
            {
              path: '../../../icons/template.png',
              value: 'center',
              isActive: textBoxData.alignment === 'center',
              inputHandler: (e) => updateValue(e, 'alignment')
            },
            {
              path: '../../../icons/template.png',
              value: 'right',
              isActive: textBoxData.alignment === 'right',
              inputHandler: (e) => updateValue(e, 'alignment')
            }
          ]
        }
      ]
    },

    reset: {
      confirm: {
        label: 'Are you sure you want to reset all the changes?',
        buttonText: 'Confirm'
        // inputHandler: (e) =>
      }
    }
  };
}
