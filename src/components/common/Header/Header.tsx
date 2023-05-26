import { Link } from 'react-router-dom';
import classes from './header.module.scss';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BsFillCartFill } from 'react-icons/bs';

interface HeaderProps {
  headerTitle?: string;
}

const Header = ({ headerTitle }: HeaderProps) => {
  return (
    <header className={classes.header}>
      <IoMdArrowRoundBack className={classes.backimg} />
      {headerTitle ? (
        <Link to="/" className={classes.title}>
          <h2>{headerTitle}</h2>
        </Link>
      ) : null}
      <BsFillCartFill className={classes.cartimg} />
    </header>
  );
};

export default Header;
