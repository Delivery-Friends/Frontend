import classes from './header.module.scss';
import { AiOutlineMenu } from 'react-icons/ai';
import placeHolderAvatar from '../../../assets/images/placeholder.jpg';
const UserMenu = () => {
  return (
    <div className={classes.usermenu}>
      <AiOutlineMenu />
      <div>
        <img src={placeHolderAvatar} alt="" />
      </div>
    </div>
  );
};

export default UserMenu;
