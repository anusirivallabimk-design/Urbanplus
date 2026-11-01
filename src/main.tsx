import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './lib/leafletSetup';
import './index.css';
import './style/theme.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
