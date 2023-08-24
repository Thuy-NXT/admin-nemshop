import React from 'react';
import loadable from '@loadable/component';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoardLayout from './layout/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = loadable(() => import('./pages/dashboard'));
const Category = loadable(() => import('./pages/category'));
const Collection = loadable(() => import('./pages/collection'));
const Product = loadable(() => import('./pages/products'));

function AppMain() {
  return (
    <div className="App">
      <ToastContainer autoClose={1000} />
      <BrowserRouter basename={''}>
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  replace
                  to="/dashboard"
                />
              }
            />

            <Route
              path="/dashboard"
              element={
                <DashBoardLayout>
                  <Dashboard />
                </DashBoardLayout>
              }
            />
            <Route
              path="/category"
              element={
                <DashBoardLayout>
                  <Category />
                </DashBoardLayout>
              }
            />
            <Route
              path="/products"
              element={
                <DashBoardLayout>
                  <Product />
                </DashBoardLayout>
              }
            />
            <Route
              path="/collection"
              element={
                <DashBoardLayout>
                  <Collection />
                </DashBoardLayout>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default AppMain;
