import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import isMobile from './utils/isMobile';

if (isMobile) {
  const metaViewport = document.querySelector('meta[name=viewport]');
  metaViewport.setAttribute(
    'content',
    'height=' + window.innerHeight + 'px, width=device-width, initial-scale=1.0'
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
