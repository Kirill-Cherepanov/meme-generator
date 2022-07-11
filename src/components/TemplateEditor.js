import React, { useState } from 'react';
import Canvas from './Canvas';
import ToolSidebar from './ToolSidebar';
import './TemplateEditor.scss';

// const templateDataExample = {
//   id: '61579',
//   name: 'One Does Not Simply',
//   url: 'https://i.imgflip.com/1bij.jpg',
//   width: 568,
//   height: 335,
//   box_count: 2
// };

const params = new URLSearchParams({
  template_id: '61579',
  text0: 'TEXT0',
  text1: 'TEXT1',
  username: 'KissMyUSSR1',
  password: 'U7mzJ!28PpKhpnY'
});

// boxs height -- font size
// we can specify font size without

const params0 = new URLSearchParams({
  template_id: '61579',
  username: 'KissMyUSSR1',
  password: 'U7mzJ!28PpKhpnY',
  'boxes[0][text]': 'Write your text here here here here here',
  'boxes[0][x]': '10',
  'boxes[0][y]': '10',
  'boxes[0][width]': '300',
  'boxes[0][height]': '74',
  'boxes[1][text]': 'text1',
  max_font_size: '32'
});

const makeMeme = (params) => {
  fetch(`https://api.imgflip.com/caption_image?${params}`)
    .then((data) => data.json())
    .then((json) => console.log(json.data.url));
};
makeMeme(params0);

export default function TemplateEditor({ template }) {
  const [selectedTextBox, selectTextBox] = useState();
  return (
    <>
      <div className="template-editor">
        <Canvas
          templateData={template}
          handleSelection={selectTextBox}
          handleModifySidebarParams={() => {}}
        />
        <ToolSidebar selectedTextBoxInfo={selectedTextBox} />
      </div>
    </>
  );
}
