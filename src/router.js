import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from 'components/Main';
import Test from 'components/Test';
import NotFound from 'components/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <Main />,
  },
  {
    path: '/signup',
    element: <Test />,
  },
  {
    path: '/todo',
    element: <Test />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
