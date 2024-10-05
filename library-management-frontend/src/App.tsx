import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { Home } from './pages';

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
        element: <div>Books</div>,
      },
      {
        id: 'users',
        path: '/users',
        element: <div>Users</div>,
      },
      {
        id: 'book-details',
        path: '/books/:id',
        element: <div>BookDetails</div>,
      },
      {
        id: 'user-details',
        path: '/users/:id',
        element: <div>UserDetails</div>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
