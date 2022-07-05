import './App.css';
import 'normalize.css';
import TemplateChoose from './components/TemplateChoose';
import Canvas from './components/Canvas';
import ToolSidebar from './components/ToolSidebar';

function App() {
  return (
    <>
      {/* <TemplateChoose /> */}
      <div className="template-editor">
        <Canvas />
        <ToolSidebar />
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
