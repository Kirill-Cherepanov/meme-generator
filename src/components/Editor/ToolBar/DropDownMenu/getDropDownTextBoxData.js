import boldIcon from '../../../../icons/bold.png';
import italicIcon from '../../../../icons/italic.png';
import underlinedIcon from '../../../../icons/underlined.png';
import crossedIcon from '../../../../icons/crossed.png';
import leftAlignIcon from '../../../../icons/left-align.png';
import centerAlignIcon from '../../../../icons/center-align.png';
import rightAlignIcon from '../../../../icons/right-align.png';

function isNumeric(str) {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const MAX_VALUES = {
  fontSize: 100,
  opacity: 100,
  backgroundOpacity: 100
};

export default function getDropDownTextBoxData(selectedIndex, TextBoxContext) {
  const { textBoxesData, setTextBoxesData } = TextBoxContext;
  const textBoxData = textBoxesData[selectedIndex];

  const updateValue = (e, type) => {
    const value = isNumeric(e.currentTarget.value)
      ? Number(e.currentTarget.value)
      : e.currentTarget.value;

    if (MAX_VALUES[type] !== undefined && MAX_VALUES[type] < value) {
      e.currentTarget.value = textBoxData[type];
      return;
    }

    setTextBoxesData((textBoxesData) => {
      const newTextBoxesData = JSON.parse(JSON.stringify(textBoxesData));
      newTextBoxesData[selectedIndex][type] = value;
      return newTextBoxesData;
    });
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
          max: MAX_VALUES.fontSize,
          numberLabel: 'px',
          value: textBoxData.fontSize,
          inputHandler: (e) => updateValue(e, 'fontSize')
        }
      ],
      list: [
        {
          label: 'Font Family',
          items: [
            'Roboto',
            'Arial',
            'Impact',
            'Courier',
            'Comic',
            'Times new roman',
            'sans-serif',
            'serif'
          ],
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
              path: boldIcon,
              isActive: textBoxData.textMods.bold,
              inputHandler: () => toggleTextModifiers('bold')
            },
            {
              path: italicIcon,
              isActive: textBoxData.textMods.italic,
              inputHandler: () => toggleTextModifiers('italic')
            },
            {
              path: underlinedIcon,
              isActive: textBoxData.textMods.underlined,
              inputHandler: () => toggleTextModifiers('underlined')
            },
            {
              path: crossedIcon,
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
              path: leftAlignIcon,
              value: 'left',
              isActive: textBoxData.alignment === 'left',
              inputHandler: (e) => updateValue(e, 'alignment')
            },
            {
              path: centerAlignIcon,
              value: 'center',
              isActive: textBoxData.alignment === 'center',
              inputHandler: (e) => updateValue(e, 'alignment')
            },
            {
              path: rightAlignIcon,
              value: 'right',
              isActive: textBoxData.alignment === 'right',
              inputHandler: (e) => updateValue(e, 'alignment')
            }
          ]
        }
      ]
    },

    filters: {}
  };
}
