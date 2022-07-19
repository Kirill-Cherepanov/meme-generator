const MAX_VALUES = {
  hueRotate: 360,
  saturation: 100,
  brightness: 100,
  blur: 100,
  sepia: 100
};

export default function getDropDownImageData(templateStylesState) {
  const [templateStyles, setTemplateStyles] = templateStylesState;

  const updateImageFilters = (e, type) => {
    const value = Number(e.currentTarget.value);

    setTemplateStyles((templateStyles) => {
      if (MAX_VALUES[type] < value) {
        e.currentTarget.value = templateStyles[type];
        return templateStyles;
      }

      console.log({ ...templateStyles, ...{ [type]: value } });

      return { ...templateStyles, ...{ [type]: value } };
    });
  };

  return {
    range: [
      {
        label: 'hueRotate',
        min: 0,
        max: 360,
        numberLabel: 'deg',
        value: templateStyles.hueRotate,
        inputHandler: (e) => updateImageFilters(e, 'hueRotate')
      },
      {
        label: 'saturation',
        min: 0,
        max: 100,
        numberLabel: '%',
        value: templateStyles.saturation,
        inputHandler: (e) => updateImageFilters(e, 'saturation')
      },
      {
        label: 'brightness',
        min: 0,
        max: 100,
        numberLabel: '%',
        value: templateStyles.brightness,
        inputHandler: (e) => updateImageFilters(e, 'brightness')
      },
      {
        label: 'blur',
        min: 0,
        max: 100,
        numberLabel: 'px',
        value: templateStyles.blur,
        inputHandler: (e) => updateImageFilters(e, 'blur')
      },
      {
        label: 'sepia',
        min: 0,
        max: 100,
        numberLabel: '%',
        value: templateStyles.sepia,
        inputHandler: (e) => updateImageFilters(e, 'sepia')
      }
    ]
  };
}
