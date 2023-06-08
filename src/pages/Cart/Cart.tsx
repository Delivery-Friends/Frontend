import classes from './cart.module.scss';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userCart } from '../../api/cartAxios';
import Button from '../../components/common/Button/Button';
import { accessInstance } from '../../api/axiosBase';

interface Menu {
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

interface UserCart {
  cartId: number;
  storeId: number;
  storeName: string;
  deliveryTip: number;
  medium: string[];
  menus: Menu[];
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<UserCart[]>([]);
  const [teamStoreName, setTeamStoreName] = useState<string>();
  const [teamStoreId, setTeamStoreId] = useState<number>();

  useEffect(() => {
    const userCartApi = async () => {
      const data = await userCart();
      setCartData(data);
    };
    userCartApi();
  }, []);

  useEffect(() => {
    const api = async () => {
      const { data } = await accessInstance.get('/team/my');
      setTeamStoreName(data.payload.storeName);
      setTeamStoreId(data.payload.storeId);
    };

    api();
  }, []);

  const calculatorTotalPrice = (menu: Menu) => {
    let totalPrice: any;
    let optionPrice;
    if (menu && menu.options) {
      optionPrice = menu.options.reduce((accur, option) => {
        return accur + option.price * option.count;
      }, 0);
    } else {
      optionPrice = 0;
    }

    totalPrice = (menu.price * menu.count + optionPrice).toLocaleString();
    return totalPrice;
  };

  // let totalPrice: string;
  // if (cartData.length > 0) {
  //   const optionPrice = cartData[0].menus[0].options.reduce((accur, option) => {
  //     return accur + option.price * option.count;
  //   }, 0);

  //   totalPrice = (
  //     cartData[0].menus[0].price * cartData[0].menus[0].count +
  //     optionPrice
  //   ).toLocaleString();
  // }

  const teamCartHandler = async (cartId: number) => {
    const { data } = await accessInstance.post('/team/cart', {
      cartId: cartId,
    });

    if (data.statusCode === 200) {
      navigate('/teamcart');
      return;
    }

    if (data.statusCode === 30001) {
      alert(data.message);
      return;
    }
  };

  const cartDeleteHandler = async (storeId: number) => {
    await accessInstance.post(
      '/user/cart/delete',
      {},
      { params: { storeId: storeId } }
    );

    setCartData(prevcarts =>
      prevcarts.filter(cart => cart.storeId !== storeId)
    );
  };

  return (
    <div className={classes.cartMainWrapper}>
      <p>
        {teamStoreName
          ? `현재 고객님은 ${teamStoreName} 에서 주문을 하실 수
          있습니다.`
          : '아직 가입된 팀이 없습니다.'}
      </p>
      {cartData.length > 0 &&
        cartData.map((cart, index) => {
          return (
            <div key={index} className={classes.wrapCart}>
              <div className={classes.cartItem}>
                <div className={classes.storeName}>
                  <div
                    className={classes.delete}
                    onClick={() => {
                      cartDeleteHandler(cart.storeId);
                    }}
                  >
                    <GrClose />
                  </div>
                  <img
                    src={cart.medium[0]}
                    alt="storeImg"
                    onClick={() => navigate(`/storeDetail/${cart.storeId}`)}
                  />
                  <div
                    className={classes.name}
                    onClick={() => navigate(`/storeDetail/${cart.storeId}`)}
                  >
                    {cart?.storeName}{' '}
                  </div>
                  <Button
                    size="sm"
                    active
                    onClick={() => {
                      teamCartHandler(cart.cartId);
                    }}
                    disabled={teamStoreId !== cart.storeId}
                  >
                    주문하기
                  </Button>
                </div>
                <div className={classes.menuItem}>
                  {cart.menus.map((menu, index) => {
                    return (
                      <ul key={index} className={classes.cartMenu}>
                        <li>
                          <div className={classes.menuName}>{menu?.name}</div>
                          <div className={classes.menuInfo}>
                            <img src={cart?.medium[0]} alt="메뉴이미지" />
                            <div className={classes.info}>
                              <div className={classes.price}>
                                • 가격 :{menu?.price.toLocaleString()}원{' '}
                                {menu?.count}개
                              </div>
                              <div className={classes.options}>
                                {menu &&
                                  menu?.options?.map((option, index) => (
                                    <div key={index}>
                                      {`•${option.name} : ${
                                        option.count
                                      }개 : ${option.price.toLocaleString()}`}
                                    </div>
                                  ))}
                              </div>
                              <div className={classes.totalPrice}>
                                {calculatorTotalPrice(menu)}원
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
