import { createBrowserRouter } from 'react-router';
import Root from './Root';
import Home from '../page/Home';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default router;
