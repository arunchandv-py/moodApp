import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';  // Ensure you have Tailwind CSS imported

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/mood-tracker">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
