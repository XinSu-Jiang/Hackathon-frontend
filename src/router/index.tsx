import { createBrowserRouter } from 'react-router';
import Root from './Root';
import Home from '@/page/Home';
import UserPage from '@/page/UserPage';
import PostPage from '@/page/PostPage';
import CreatePostPage from '@/page/CreatePostPage';
import LoginCallback from '@/LoginCallback';
import LoginPage from '@/page/LoginPage';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/users/:userId',
        element: <UserPage />,
      },
      {
        path: '/posts/:postId',
        element: <PostPage />,
      },
      {
        path: '/create-post',
        element: <CreatePostPage />,
      },
      {
        path: '/oauth2/redirect',
        element: <LoginCallback />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
]);

export default router;
