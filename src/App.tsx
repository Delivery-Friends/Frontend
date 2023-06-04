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

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/',
    element: <Root />,
    children: [
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
        path: 'befDetail',
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
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: 'reviewWrite',
        element: <ReviewWrite />,
      },
      {
        path: 'paymentorder/:orderId',
        element: <PaymentOrder />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
      { path: 'payment/success', element: <PaymentSuccess /> },
      { path: 'payment/fail', element: <PaymentFail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
