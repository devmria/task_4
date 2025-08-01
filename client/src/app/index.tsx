import { BrowserRouter } from 'react-router-dom';
import { AuthRoute } from './routes';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthRoute />
    </BrowserRouter>
  );
}