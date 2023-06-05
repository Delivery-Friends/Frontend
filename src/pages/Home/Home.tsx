import { useEffect, useState } from 'react';
import Button from '../../components/common/Button/Button';
import classes from './home.module.scss';
import { IoLocationSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axiosBase';

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    firsrDepth: '',
    secondDepth: '',
  });

  const [popular, setPopular] = useState<string[]>(['', '', '', '', '']);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
    instance.get('/popular/category').then(res => setPopular(res.data.payload));
  }, []);

  const onSuccess = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    let coord = new kakao.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };
  const geocoder = new kakao.maps.services.Geocoder();

  let callback = function (result: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      setLocation({
        ...location,
        firsrDepth: result[0].address.region_2depth_name,
        secondDepth: result[0].address.region_3depth_name,
      });
    } else {
      alert('주소변환 실패');
    }
  };

  return (
    <div>
      <div className={classes.main}>
        <div>
          <IoLocationSharp size={20} />
          <span style={{ marginRight: '.5rem' }}>{location.firsrDepth}</span>
          <span>{location.secondDepth}</span>
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
        <div className={classes.info}>
          본 사이트는 모바일 환경에 최적화 되어있습니다.
        </div>
        <img
          className={classes.info}
          src="/image/delivery-friends-QRcode.png"
          alt="logo"
        />
        <div className={classes.info}>
          핸드폰으로 QR을 스캔하여 사이트를 이용해주세요.
        </div>
      </div>
    </div>
  );
};

export default Home;
