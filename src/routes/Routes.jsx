import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoute } from 'react-router-dom';
import Home from '../pages/home/Home';
import { Private } from '../auth/Private';
import { path } from './RoutesConstant';
import AdminPopUp from '../pages/adminpopup/AdminPopUp';

export const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoute>
        <Route path={path.home.path} element={<Home />} />
        <Route path="/" element={<Private />}>
          <Route
            path={path.private.path}
            element={<h1>this private route</h1>}
          />
        </Route>
        <Route path={path.AdminDasboard.path} element={<AdminPopUp />} />
        <Route path={path.error.path} element={<h1>page not found</h1>} />
      </ReactRoute>
    </BrowserRouter>
  );
};
