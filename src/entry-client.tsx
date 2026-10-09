import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/print.css';
import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root element');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds ship prerendered HTML, which is hydrated; the dev server renders from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
