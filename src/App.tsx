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
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import ReviewWrite from './pages/ReviewWrite/ReviewWrite';
import PaymentOrder from './pages/PaymentOrder/PaymentOrder';
import Payment from './pages/Payment/Payment';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import PaymentFail from './pages/Payment/PaymentFail';
import UserDetail from './pages/UserDetail/UserDetail';
import LikedStore from './pages/LikedStore/LikedStore';
import MyPage from './pages/MyPage/MyPage';
import TeamCart from './pages/TeamCart/TeamCart';
import useAuthInterceptors from './hook/useAuthInterceptors';

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
        path: 'likedStore',
        element: <LikedStore />,
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
        path: 'foodoption',
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
        path: 'userDetail/:id',
        element: <UserDetail />,
      },
      {
        path: 'befMap',
        element: <BefMap />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'mypage', element: <MyPage /> },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: 'reviewWrite',
        element: <ReviewWrite />,
      },
      {
        path: 'paymentorder',
        element: <PaymentOrder />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      { path: 'payment/success', element: <PaymentSuccess /> },
      { path: 'payment/fail', element: <PaymentFail /> },
      { path: 'teamcart', element: <TeamCart /> },
    ],
  },
]);

function App() {
  useAuthInterceptors();
  return <RouterProvider router={router} />;
}

export default App;
