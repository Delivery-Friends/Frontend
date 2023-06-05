import classes from './navbar.module.scss';
import { AiOutlineHome } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { FaRegGrinHearts } from 'react-icons/fa';
import { MdPersonOutline, MdOutlineStickyNote2 } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={classes['bottom-nav']}>
      <h3 className="ir">delivery-freinds 네비게이션</h3>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.selected : '')}
            >
              <AiOutlineHome size="20" />
              <span>홈</span>
            </NavLink>
          </li>
          <li onClick={() => navigate('/storeList', { state: '' })}>
            <NavLink
              to="/storeList"
              className={({ isActive }) => (isActive ? classes.selected : '')}
            >
              <BiSearch size="20" />
              <span>배달</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/likedStore"
              className={({ isActive }) => (isActive ? classes.selected : '')}
            >
              <FaRegGrinHearts size="20" />
              <span>찜한가게</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order"
              className={({ isActive }) => (isActive ? classes.selected : '')}
            >
              <MdOutlineStickyNote2 size="20" />
              <span>주문내역</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? classes.selected : '')}
            >
              <MdPersonOutline size="20" />
              <span>내 정보</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
