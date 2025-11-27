import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { SanityProvider } from './sanity/SanityProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SanityProvider>
      <App />
    </SanityProvider>
  </StrictMode>,
);
