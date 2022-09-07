import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';

import './styles/index.css';

import { store } from './store';
import { AuthGuard } from './guards';
import { CoursePage, LoginPage, NotFound, ProfilePage } from './pages';
import { setupServer } from './services';
import { Header } from './components';

setupServer();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<AuthGuard />}>
          <Route index element={<ProfilePage />} />
          <Route path="/profile/course/:courseId" element={<CoursePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);
