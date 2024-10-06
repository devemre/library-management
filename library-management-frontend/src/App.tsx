import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { BookDetails, Books, Home, UserDetails, Users } from './pages';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Layout />,
    children: [
      {
        id: 'home',
        path: '/',
        element: <Home />,
      },
      {
        id: 'books',
        path: '/books',
        element: <Books />,
      },
      {
        id: 'users',
        path: '/users',
        element: <Users />,
      },
      {
        id: 'book-details',
        path: '/books/:id',
        element: <BookDetails />,
      },
      {
        id: 'user-details',
        path: '/users/:id',
        element: <UserDetails />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
