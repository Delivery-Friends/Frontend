import classes from './cart.module.scss';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userCart } from '../../api/cartAxios';

interface UserCart {
  cartId: number;
  storeId: number;
  storeName: string;
  deliveryTip: number;
  menus: [
    {
      name: string;
      price: number;
      count: number;
      options: [
        {
          name: string;
          price: number;
          count: number;
        }
      ];
    }
  ];
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<UserCart[]>([]);

  useEffect(() => {
    const userCartApi = async () => {
      const data = await userCart();
      setCartData(data);
    };
    userCartApi();
  }, []);

  const foodpaymentHandler = () => {
    navigate('/paymentorder/order1234', {
      state: { cartData: cartData },
    });
  };

  let totalPrice;
  if (cartData.length > 0) {
    const optionPrice = cartData[0].menus[0].options.reduce((accur, option) => {
      return accur + option.price * option.count;
    }, 0);

    totalPrice = (
      cartData[0].menus[0].price * cartData[0].menus[0].count +
      optionPrice
    ).toLocaleString();
  }

  return (
    <div>
      {cartData.length > 0 && (
        <div className={classes.wrapCart}>
          <div
            className={classes.storeName}
            onClick={() => navigate(`/storeDetail/${cartData[0].storeId}`)}
          >
            <img src="/image/brandLogo/bbqLogo.png" alt="storeImg" />
            <div className={classes.name}>{cartData[0]?.storeName}</div>
          </div>
          <ul className={classes.cartMenu}>
            <li>
              <div className={classes.menuName}>
                {cartData[0]?.menus[0]?.name}
                <div className={classes.delete}>
                  <GrClose />
                </div>
              </div>
              <div className={classes.menuInfo}>
                <img src="/image/brandLogo/bbqLogo.png" alt="menuImg" />
                <div className={classes.info}>
                  <div className={classes.price}>
                    • 가격 : {cartData[0]?.menus[0]?.price.toLocaleString()}원
                  </div>
                  <div className={classes.options}>
                    {cartData[0]?.menus[0]?.options.map((option, index) => (
                      <div key={index}>
                        {`• ${option.name} : ${
                          option.count
                        } : ${option.price.toLocaleString()}`}
                      </div>
                    ))}
                  </div>
                  <div className={classes.totalPrice}>{totalPrice}원</div>
                </div>
              </div>
            </li>
          </ul>
          <div className={classes.calculate}>
            <div className={classes.key}>
              총 주문금액 <div className={classes.price}>{totalPrice}원</div>
            </div>
            <div className={classes.key}>
              배달팁{' '}
              <div className={classes.price}>
                {cartData[0].deliveryTip.toLocaleString()} / n원
              </div>
            </div>
            <div className={classes.total}>
              결제예정금액{' '}
              <div
                className={classes.price}
              >{`${totalPrice} + ${cartData[0].deliveryTip} / n 원`}</div>
            </div>
          </div>
          <div className={classes.bottomBar}>
            <button onClick={foodpaymentHandler}>
              <div className={classes.count}>{cartData[0].menus[0].count}</div>
              <div>배달 주문하기</div>
              <div className={classes.totalPrice}>{totalPrice}원</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
