import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

console.log('Index.js is running');

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/mood-tracker">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Add global error handling
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});
