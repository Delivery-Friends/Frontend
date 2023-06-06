import { useEffect, useState } from 'react';
import Button from '../../components/common/Button/Button';
import classes from './home.module.scss';
import { IoLocationSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axiosBase';
import Modal from '../../components/common/Modal/Modal';

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    <div className={classes.wrapHome}>
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
              navigate('/storeList?category=&sort=orderCount%2CDesc');
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
              navigate('/storeList?category=&sort=orderCount%2CDesc');
            }}
          >
            맛집랭킹
          </Button>
          <div className={classes.title}>실시간 인기 카테고리</div>
          <ul className={classes.popular}>
            <li
              onClick={() =>
                navigate(
                  `/storeList?category=${popular[0]}&sort=orderCount%2CDesc`
                )
              }
            >
              {popular[0]}
            </li>
            <li
              onClick={() =>
                navigate(
                  `/storeList?category=${popular[1]}&sort=orderCount%2CDesc`
                )
              }
            >
              {popular[1]}
            </li>
            <li
              onClick={() =>
                navigate(
                  `/storeList?category=${popular[2]}&sort=orderCount%2CDesc`
                )
              }
            >
              {popular[2]}
            </li>
            <li
              onClick={() =>
                navigate(
                  `/storeList?category=${popular[3]}&sort=orderCount%2CDesc`
                )
              }
            >
              {popular[3]}
            </li>
            <li
              onClick={() =>
                navigate(
                  `/storeList?category=${popular[4]}&sort=orderCount%2CDesc`
                )
              }
            >
              {popular[4]}
            </li>
          </ul>
        </div>
        <img src="/image/logo.png" alt="logo" />
        <Button size="lg" onClick={openModalHandler}>
          공지사항
        </Button>
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
      <Modal
        title="공지사항"
        body={
          <ul className={classes.modalText}>
            <li>
              주문방법 : 배프등록/참여 {'>'} 메뉴/옵션선택 {'>'} 장바구니담기{' '}
              {'>'} 팀리더가 주문결정 {'>'} 각자 결제 진행 {'>'} 주문완료
            </li>
            <li>
              <div>*************************************************</div>
              <div>혼자주문은 배프등록을 1인으로 하시면 됩니다.</div>
              <div>*************************************************</div>
            </li>
            <li>
              업데이트 예정기능 : 알람기능, 실시간통신기능, 알고리즘을 통한
              메뉴추천기능
            </li>
          </ul>
        }
        isOpen={isModalOpen}
        onClose={openModalHandler}
      />
    </div>
  );
};

export default Home;
