import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouteObject } from 'luciano-react-router/types'
import App from './App.tsx'
const Login = lazy(() => import('./pages/login.tsx')); 
const Forum = lazy(() => import('./pages/forum.tsx'));
const Portfolio = lazy(() => import('./pages/portfolio.tsx'));

const routes: Array<RouteObject> = [
  {
    path: "/",
    component: Portfolio,
  },
  {
    path: "/articles",
    component: Forum,
  },
  {
    path: "/login",
    component: Login
  }
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App routes={routes}/>
  </React.StrictMode>,
)
