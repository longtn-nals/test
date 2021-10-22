import { lazy } from 'react';

// pages
const HomePage = lazy(() => import('./App'));
const ViewForm = lazy(() => import('./component/ViewForm'));

// constant
var indexRoutes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/ViewForm/:formID',
    name: 'ViewForm',
    component: ViewForm,
  },
];

export default indexRoutes;
