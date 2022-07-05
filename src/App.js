import './App.css';
import 'normalize.css';
import TemplateChoose from './components/TemplateChoose';
import Canvas from './components/Canvas';
import ToolSidebar from './components/ToolSidebar';

const templateDataExample = {
  id: '61579',
  name: 'One Does Not Simply',
  url: 'https://i.imgflip.com/1bij.jpg',
  width: 568,
  height: 335,
  box_count: 2
};

const selected = false;

const selectedTextBoxInfoExample = {
  x: 0,
  y: 0,
  width: 200,
  height: 100
};

function App() {
  return (
    <>
      {/* <TemplateChoose /> */}
      <div className="template-editor">
        <Canvas
          templateData={templateDataExample}
          handleSelection={() => {}}
          handleModifySidebarProps={() => {}}
        />
        <ToolSidebar
          selectedTextBoxInfo={!selected ?? selectedTextBoxInfoExample}
        />
      </div>
      {/* <footer></footer> */}
    </>
  );
}

export default App;

// # TemplateChoose
//   Upload a new template
//   Choose from popular templates

// # ToolSidebar (retractable on mobile)
//   Change template
//   Set margins (Didn't find this option in API. Could be that we need to set negative x, y in (1))
//   Add text 20 is max (1)
//   Generate meme

// # (1) after clicking on a text box these options are added to the ToolSidebar
//   Change color
//   Change outline color
//   Change font
//   Position (it'll be dragable it will show the position here)
//   Width, height

// # Canvas
//   Meme template
//   Draggable mutable (can change width, height and text on canvas (changes are displayed in (1))) text boxes
