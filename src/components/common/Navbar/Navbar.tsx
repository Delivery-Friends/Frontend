import classes from './navbar.module.scss';

const Navbar = () => {
  return (
    <header className={classes.header}>
      <h2 className="ir">delivery-freinds 메인 네비게이션</h2>
      <nav className={classes.nav}>
        <ul>
          <li>홈</li>
          <li>검색</li>
          <li>찜한가게</li>
          <li>주문내역</li>
          <li>내 정보</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
