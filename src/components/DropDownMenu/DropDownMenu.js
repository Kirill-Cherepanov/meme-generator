import React, { useContext } from 'react';
import { Rnd } from 'react-rnd';
import DropDownColor from './DropDownColor/DropDownColor';
import DropDownButtons from './DropDownButtons/DropDownButtons';
import DropDownRange from './DropDownRange/DropDownRange';
import DropDownList from './DropDownList/DropDownList';
import {
  getDropDownTextBoxData,
  getDropDownImageData
} from './getDropDownData';
import './DropDownMenu.scss';
import { TextBoxContext } from '../../context/TextBoxContext';

const createDropDownComponent = (el, index, props) => {
  switch (el) {
    case 'color':
      return <DropDownColor key={index} {...props}></DropDownColor>;
    case 'buttons':
      return <DropDownButtons key={index} {...props}></DropDownButtons>;
    case 'range':
      return <DropDownRange key={index} {...props}></DropDownRange>;
    case 'list':
      return <DropDownList key={index} {...props}></DropDownList>;
    default:
      return 'Nothing found';
  }
};

export default function DropDownMenu({
  dropMenuState,
  selectedIndex,
  dropDownMenuPosState,
  templateStylesState
}) {
  const [dropDownMenuPos, setDropDownMenuPos] = dropDownMenuPosState;
  const [dropMenuType, setDropMenuType] = dropMenuState;
  const textBoxContext = useContext(TextBoxContext);

  let dropDownData;
  if (dropMenuType === 'filters') {
    dropDownData = getDropDownImageData(templateStylesState);
  } else {
    dropDownData = getDropDownTextBoxData(selectedIndex, textBoxContext)[
      dropMenuType
    ];
  }

  const dropDownComponents = [].concat(
    ...Object.keys(dropDownData).map((componentType, index1) => {
      return dropDownData[componentType].map((componentProps, index2) => {
        return createDropDownComponent(
          componentType,
          '' + index1 + index2,
          componentProps
        );
      });
    })
  );

  return (
    <Rnd
      position={{ x: dropDownMenuPos.x, y: dropDownMenuPos.y }}
      onDragStop={(e, d) => {
        setDropDownMenuPos({ x: d.x, y: d.y });
      }}
      bounds="window"
      className="drop-down-menu"
      enableResizing={false}
      cancel="input, .drop-down-menu__close-btn, .drop-down-menu__list-option, .drop-down-menu__buttons-btn"
      style={{ display: 'flex' }}
    >
      {dropDownComponents}
      <button
        className="drop-down-menu__close-btn"
        onClick={() => setDropMenuType(undefined)}
      />
    </Rnd>
  );
}
