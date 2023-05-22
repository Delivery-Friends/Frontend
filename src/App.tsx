import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root/Root';
import Home from './pages/Home/Home';
import StoreList from './pages/StoreList/StoreList';
import StoreDetail from './pages/StoreDetail/StoreDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'storeList',
        element: <StoreList />,
      },
      {
        path: 'storeDetail/:id',
        element: <StoreDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
