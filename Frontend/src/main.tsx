import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Portfolio from './pages/portfolio.tsx'
import Forum from './pages/forum.tsx'
import { RouteObject } from 'luciano-react-router/types'
import App from './App.tsx'
import Login from './pages/login.tsx'

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
