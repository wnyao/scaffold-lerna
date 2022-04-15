import '@packages/core/client/styles/index.css';
import '@packages/core/lib/i18n';

import React, { FC } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import ROUTES from '@packages/core/client/routes';
import lazy from '@packages/core/lib/lazy';

const Home = lazy(() => import('@/pages/Home'));

const App: FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};

export default App;
