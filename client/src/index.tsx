import { App } from 'app';
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement);

root.render(
  <App />
);