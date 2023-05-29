import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root/Root';
import Home from './pages/Home/Home';
import StoreList from './pages/StoreList/StoreList';
import StoreDetail from './pages/StoreDetail/StoreDetail';
import FoodOption from './pages/FoodOption/FoodOption';
import BefList from './pages/BefList/BefList';
import Login from './pages/Login/Login';
import LoginKakao from './pages/Login/LoginKakao';

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
      {
        path: 'foodoption/:id',
        element: <FoodOption />,
      },
      {
        path: 'BefList',
        element: <BefList />,
      },
      { path: 'login/kakao', element: <LoginKakao /> },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
