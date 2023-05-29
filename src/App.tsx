import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root/Root';
import Home from './pages/Home/Home';
import StoreList from './pages/StoreList/StoreList';
import StoreDetail from './pages/StoreDetail/StoreDetail';
import FoodOption from './pages/FoodOption/FoodOption';
import BefList from './pages/BefList/BefList';
import Login from './pages/Login/Login';
import LoginKakao from './pages/Login/LoginKakao';
import Signup from './pages/Signup/Signup';
import BefDetail from './pages/BefDetail/BefDetail';
import BefRegistration from './pages/BefRegistration/BefRegistration';
import BefMap from './pages/BefMap/BefMap';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'login',
        element: <Login />,
      },
      { path: 'login/kakao', element: <LoginKakao /> },
      {
        path: 'signup',
        element: <Signup />,
      },
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
        path: 'befList',
        element: <BefList />,
      },
      {
        path: 'befDetail/:id',
        element: <BefDetail />,
      },
      {
        path: 'befRegistration',
        element: <BefRegistration />,
      },
      {
        path: 'befMap',
        element: <BefMap />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
