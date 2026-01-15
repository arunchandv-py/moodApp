import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

console.log('Index.js is running');
console.log('Current environment:', process.env.NODE_ENV);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// Add global error handling
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});
