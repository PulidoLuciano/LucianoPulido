import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouteObject } from 'luciano-react-router/types'
import App from './App.tsx' 
const Editor = lazy(() => import('./pages/editor.tsx'));
const EditUser = lazy(() => import('./pages/editProfile.tsx'));
const UserAdmin = lazy(() => import('./pages/userAdmin.tsx'));
const Dashboard = lazy(() => import('./pages/dashboard.tsx'));
const Article = lazy(() => import('./pages/article.tsx'));
const SearchResults = lazy(() => import('./pages/searchResults.tsx'));
const Category = lazy(() => import('./pages/categories.tsx'));
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
    path: "/categories/:categoryName",
    component: Category
  },
  {
    path: "/search",
    component: SearchResults
  },
  {
    path: "/articles/:id",
    component: Article
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/admin",
    component: Dashboard
  },
  {
    path: "/admin/user/:username",
    component: UserAdmin
  },
  {
    path: "/user/edit",
    component: EditUser
  },
  {
    path: "/admin/articles/add",
    component: Editor
  },
  {
    path: "/admin/articles/edit/:articleId",
    component: Editor
  }
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App routes={routes}/>
  </React.StrictMode>,
)
