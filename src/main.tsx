import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import './index.css';

// The pinned stages depend on scroll position; always start at the top.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are pre-rendered at build time; in development the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
