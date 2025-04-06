import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PlagiarismChecker from './page.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlagiarismChecker />
  </StrictMode>
);
