import Button from '../../components/common/Button/Button';
import { BiTime } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './paymentorder.module.scss';
import { useEffect } from 'react';
import { accessInstance } from '../../api/axiosBase';

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

const PaymentOrder = () => {
  const navigate = useNavigate();
  const { state: cartData } = useLocation();

  const paymenyClickHandler = () => {
    navigate('/payment', {
      state: {
        orderId: '5fa721312311242',
        amount: 20000,
        orderName: 'BBQ 황금올리브',
        customerName: '이정호',
      },
    });
  };

  // useEffect(() => {
  //   const paymentOrderApi = async () => {
  //     const res = await accessInstance.get('/team/my');
  //     console.log(res);
  //   };

  //   paymentOrderApi();
  // }, []);

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
        <p>수원시 영통구 아주대학교</p>
        <span>[도로명] 은행마을로 100</span>
        <input type="text" placeholder="원천관" />
      </div>
      <div className={classes.payment}>
        <p>결제금액</p>
        <div>
          <span>주문금액</span>
          <span>20,000원</span>
        </div>
        <div>
          <span>배달팁</span>
          <span>1200원</span>
        </div>
        <div>
          <span>총 결제금액</span>
          <span>20,000원</span>
        </div>
      </div>
      <div className={classes.orderpayment}>
        <p>결제수단</p>
        <Button size="lg" onClick={paymenyClickHandler}>
          <img src="/image/userImage/toss.png" alt="토스아이콘" /> 토스페이로
          결제하기
        </Button>
      </div>
    </section>
  );
};

export default PaymentOrder;
