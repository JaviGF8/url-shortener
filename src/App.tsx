import config from 'config';
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from 'components/Navbar';

import LandingPage from 'pages/Landing';
import NotFoundPage from 'pages/NotFound';
import StatsPage from 'pages/Stats';

const App = () => (
  <Fragment>
    <header>
      <Navbar />
    </header>
    <main>
      <Routes>
        <Route path={config.url.stats} element={<StatsPage />} />
        <Route path={config.url.landing} element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </Fragment>
);

export default App;
