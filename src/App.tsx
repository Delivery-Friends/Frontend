import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root/Root';
import Home from './pages/Home/Home';
import StoreList from './pages/StoreList/StoreList';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
