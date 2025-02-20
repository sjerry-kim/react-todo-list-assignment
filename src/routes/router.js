import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';
import NotFound from 'pages/NotFound';
import Layout from 'routes/Layout';
import Signup from 'pages/Signup';
import SignupConfirm from 'pages/SignupConfirm';
import SignIn from 'pages/SignIn';
import Board from 'pages/Board';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <SignIn />,
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
    children: [{ path: '/board', element: <PrivateRoute element={<Board />} /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
