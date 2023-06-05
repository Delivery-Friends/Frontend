import { useEffect, useState } from 'react';
import Button from '../../components/common/Button/Button';
import classes from './home.module.scss';
import { IoLocationSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axiosBase';

const Home = () => {
  const navigate = useNavigate();

  const [popular, setPopular] = useState<string[]>([
    '치킨',
    '중식',
    '피자',
    '한식',
    '일식',
  ]);

  useEffect(() => {
    instance.get('/popular/category').then(res => setPopular(res.data.payload));
  }, []);

  return (
    <div>
      <div className={classes.main}>
        <div>
          <IoLocationSharp size={20} />
          <span>영통구 원천동</span>
        </div>
        <input type="text" />
        <div className={classes.title}>Delivery Friends</div>
      </div>
      <div className={classes.mainwrapper}>
        <div className={classes.orderwrapper}>
          <button
            onClick={() => {
              navigate('/storeList', { state: '' });
            }}
          >
            혼자주문
          </button>
          <button
            onClick={() => {
              navigate('/befList');
            }}
          >
            배프와주문
          </button>
        </div>
        <div className={classes.foodranking}>
          <Button
            size="lg"
            onClick={() => {
              navigate('/storeList', { state: '' });
            }}
          >
            맛집랭킹
          </Button>
          <div className={classes.title}>실시간 인기 카테고리</div>
          <ul className={classes.popular}>
            <li onClick={() => navigate('/storeList', { state: popular[0] })}>
              {popular[0]}
            </li>
            <li onClick={() => navigate('/storeList', { state: popular[1] })}>
              {popular[1]}
            </li>
            <li onClick={() => navigate('/storeList', { state: popular[2] })}>
              {popular[2]}
            </li>
            <li onClick={() => navigate('/storeList', { state: popular[3] })}>
              {popular[3]}
            </li>
            <li onClick={() => navigate('/storeList', { state: popular[4] })}>
              {popular[4]}
            </li>
          </ul>
        </div>
        <img src="/image/logo.png" alt="logo" />
      </div>
    </div>
  );
};

export default Home;
