import { Outlet } from 'react-router-dom';
import Header from '../../components/common/Header/Header';
import classes from './root.module.scss';

// const header = { '/login': '로그인', '/map': '배프지도' };

const Root = () => {
  return (
    <>
      <Header headerTitle="로그인" />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
