import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from 'pages/Login';
import Test from 'pages/Test';
import NotFound from 'pages/NotFound';
import Signup from '../pages/Signup';
import SignupConfirm from '../pages/SignupConfirm';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/signup-confirm',
    element: <SignupConfirm />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/todo', element: <Test /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
