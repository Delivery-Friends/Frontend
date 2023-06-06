import Button from '../../components/common/Button/Button';
import { BiTime } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './paymentorder.module.scss';
import { useEffect, useState } from 'react';
import { accessInstance } from '../../api/axiosBase';
import { PayInfo } from '../TeamCart/TeamCart';

// const [cart, setCart] = useState([]);
// useEffect(() => {
//   const userCartAPI = async () => {
//     // const { data } = await accessInstance.get('/user/cart');
//     // setCart(data);
//     const { data } = await axios.get('/data/cartList/cartList.json');
//     setCart(data);
//   };
//   userCartAPI();
// }, []);

// mount: productList.productPrice, //제품 가격
//           orderId: `111111111111${foodId}`, //결제 마다 고유의 주문아이디가 필요
//           orderName: productList.productName, //제품이름
//           customerName: userInfo.realName,

interface MyTeamInfo {
  storeId: number;
  storeName: string;
  storeScore: number;
  reviewCount: number;
  basicAddress: string;
  detailedAddress: string;
  longitude: string;
  latitude: string;
  endTime: string;
  medium: string[];
}

const PaymentOrder = () => {
  const navigate = useNavigate();
  const [myTeamInfo, setMyTeamInfo] = useState<MyTeamInfo>();
  const [myPayInfo, setMyPayInfo] = useState<PayInfo>();

  const paymenyClickHandler = (totalPrice: any) => {
    navigate('/payment', {
      state: {
        orderId: `1111111${myPayInfo?.orderId}12312312`,
        amount: totalPrice,
        orderName: `${myPayInfo?.menuInfo}..`,
        customerName: myPayInfo?.username,
      },
    });
  };

  useEffect(() => {
    const paymentOrderApi = async () => {
      const { data } = await accessInstance.get('/team/my');
      setMyTeamInfo(data.payload);
    };

    paymentOrderApi();
  }, []);

  useEffect(() => {
    const api = async () => {
      const { data } = await accessInstance.get('/team/payInfo');
      setMyPayInfo(data.payload);
    };

    api();
  }, []);

  let totalPrice: any;
  if (myPayInfo) {
    totalPrice = myPayInfo?.deliveryTip + myPayInfo?.price;
  }

  return (
    <section className={classes.orderwrapper}>
      <div className={classes.ordertime}>
        <p>다같이 한주소에서 받을께요</p>
        <p>
          <BiTime />
          <span>25~35분 후 도착예정</span>
        </p>
      </div>
      <div className={classes.address}>
        <p>{myTeamInfo?.basicAddress}</p>
        <span>[도로명] 은행마을로 100</span>
        <input type="text" placeholder={myTeamInfo?.detailedAddress} />
      </div>
      <div className={classes.payment}>
        <p>결제금액</p>
        <div>
          <span>주문금액</span>
          <span>{myPayInfo?.price.toLocaleString()}원</span>
        </div>
        <div>
          <span>배달팁</span>
          <span>{myPayInfo?.deliveryTip.toLocaleString()}원</span>
        </div>
        <div>
          <span>총 결제금액</span>
          <span>{totalPrice?.toLocaleString()}원</span>
        </div>
      </div>
      <div className={classes.orderpayment}>
        <p>결제수단</p>
        <Button
          size="lg"
          onClick={() => {
            paymenyClickHandler(totalPrice);
          }}
        >
          <img src="/image/userImage/toss.png" alt="토스아이콘" /> 토스페이로
          결제하기
        </Button>
      </div>
    </section>
  );
};

export default PaymentOrder;
