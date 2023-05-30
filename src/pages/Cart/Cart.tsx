import React from 'react';
import classes from './cart.module.scss';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapCart}>
      <div
        className={classes.storeName}
        onClick={() => navigate(`/storeDetail/storeId`)}
      >
        <img src="/image/brandLogo/bbqLogo.png" alt="storeImg" />
        <div className={classes.name}>가계이름</div>
      </div>
      <ul className={classes.cartMenu}>
        <li>
          <div className={classes.menuName}>
            메뉴이름
            <div className={classes.delete}>
              <GrClose />
            </div>
          </div>
          <div className={classes.menuInfo}>
            <img src="/image/brandLogo/bbqLogo.png" alt="menuImg" />
            <div className={classes.info}>
              <div className={classes.price}>• 가격 : 18,000원</div>
              <div className={classes.options}>
                <div>• 옵션제목이름 : 옵션내용..... (18,000원)</div>
                <div>• 옵션제목이름 : 옵션내용..... (18,000원)</div>
              </div>
              <div className={classes.totalPrice}>54,000원</div>
            </div>
          </div>
        </li>
      </ul>
      <div className={classes.calculate}>
        <div className={classes.key}>
          총 주문금액 <div className={classes.price}>60,000원</div>
        </div>
        <div className={classes.key}>
          배달팁 <div className={classes.price}>3,000원</div>
        </div>
        <div className={classes.total}>
          결제예정금액 <div className={classes.price}>30,000원</div>
        </div>
      </div>
      <div className={classes.bottomBar}>
        <button>
          <div className={classes.count}>2</div> <div>배달 주문하기</div>
          <div className={classes.totalPrice}>43,500 원</div>
        </button>
      </div>
    </div>
  );
};

export default Cart;
