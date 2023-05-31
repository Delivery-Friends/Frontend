import { Link } from 'react-router-dom';
import classes from './header.module.scss';

const Logo = () => {
  return (
    <Link className={classes.logo} to="/">
      {/* <img src="" alt="로고" /> */}
      Logo
    </Link>
  );
};

export default Logo;
