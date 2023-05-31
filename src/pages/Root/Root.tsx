import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import Navbar from '../../components/common/Navbar/Navbar';
import classes from './root.module.scss';

interface IndexSignature {
  [key: string]: string;
}

const headerTile: IndexSignature = {
  '/login': '로그인',
  '/signup': '회원가입',
  '/storeList': '배달',
  '/storeDetail': '음식점',
  '/foodoption': '음식',
  '/befList': '배프',
  '/befDetail': '배프정보',
  '/befRegistration': '배프등록',
  '/befMap': '배프지도',
  '/cart': '장바구니',
  '/order': '주문내역',
  '/reviewWrite': '리뷰등록',
  '/paymentorder': '결제',
  '/payment': '결제결과',
};

const Root = () => {
  const { pathname } = useLocation();
  const page = '/' + pathname.split('/', 2)[1];
  const title = headerTile[page];

  return (
    <>
      <Header headerTitle={title} />
      <main className={classes.main}>
        <Outlet />
      </main>
      <footer>
        <Navbar />
      </footer>
    </>
  );
};

export default Root;
