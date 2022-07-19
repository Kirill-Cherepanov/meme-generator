import React from 'react';
import { Rnd } from 'react-rnd';
import DropDownColor from './DropDownColor';
import DropDownButtons from './DropDownButtons';
import DropDownRange from './DropDownRange';
import useDropDownData from './useDropDownData';
import DropDownList from './DropDownList';
import './DropDownMenu.scss';

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
  image,
  dropDownMenuPosState
}) {
  const [dropDownMenuPos, setDropDownMenuPos] = dropDownMenuPosState;
  const [dropMenuType, setDropMenuType] = dropMenuState;
  const dropDownData = useDropDownData(selectedIndex, image)[dropMenuType];

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
      cancel='input[type="range"]'
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
