import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@packages/core/client/styles';
import App from './App';

const Root: FC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
