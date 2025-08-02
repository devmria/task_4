import { BrowserRouter } from 'react-router-dom';
import { AuthRoute } from './routes';
import { AuthProvider } from 'context/AuthContext';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthRoute />
      </AuthProvider>
    </BrowserRouter>
  );
}