import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.scss';
import { AuthContextProvider } from './context/auth/Auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
