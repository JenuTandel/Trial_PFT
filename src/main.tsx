import ReactDOM from 'react-dom/client';
// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import App from './App.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);
