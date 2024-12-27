import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './app/store';
import Home from './pages/Home';

import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </StrictMode>
);
