import { useState } from 'react';
import Button from '../../components/common/Button/Button';
import classes from './home.module.scss';
import { IoLocationSharp } from 'react-icons/io5';
import Modal from '../../components/common/Modal/Modal';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const soloDeliveryHandler = () => {
    navigate('/storeList');
  };

  const friendDeliveryHandler = () => {
    navigate('/storeList');
  };

  return (
    <>
      <div>
        <div className={classes.main}>
          <div>
            <IoLocationSharp size={20} />
            <span>영통구 원천동</span>
          </div>
          <input type="text" />
        </div>
        <div className={classes.mainwrapper}>
          <div className={classes.orderwrapper}>
            <Button size="lg" onClick={soloDeliveryHandler}>
              혼자주문
            </Button>
            <Button size="lg" onClick={friendDeliveryHandler}>
              배프와주문
            </Button>
          </div>
          <div className={classes.foodranking}>
            <Button size="lg">맛집랭킹</Button>
            <Button size="lg" onClick={openModalHandler}>
              실시간 인기 카테고리
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="실시간 인기 카테고리"
        isOpen={isModalOpen}
        onClose={openModalHandler}
      />
    </>
  );
};

export default Home;
