import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LineaProvider } from './contexts/LineaContext';
import { ProyectoProvider } from './contexts/ProyectoContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LineaProvider>
      <ProyectoProvider>
        <App />
      </ProyectoProvider>
    </LineaProvider>
  </StrictMode>,
);
