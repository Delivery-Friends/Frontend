import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './order.module.scss';

const Order = () => {
  const navigate = useNavigate();
  return (
    <ul className={classes.wrapOrder}>
      <li className={classes.orderItem}>
        <div className={classes.top}>
          <div className={classes.date}>4/20 (목)</div>
          <div className={classes.state}>• 배달완료</div>
        </div>
        <div className={classes.mid}>
          <img src="/image/brandLogo/bbqLogo.png" alt="store_img" />
          <div className={classes.info}>
            <div
              className={classes.name}
              onClick={() => navigate(`/storeDetail/id`)}
            >
              가계이름 {'>'}
            </div>
            <div className={classes.orderInfo}>
              <div className={classes.menu}>주문음식 이름</div>
              {/* 2개 이상이면 외? 몇개로 표시 */}
              <div className={classes.quantity}>?개</div>
              {/* 총금액 */}
              <div className={classes.price}>30,000원</div>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/reviewWrite')}>리뷰 쓰기</button>
        {/* <button onClick={() => navigate('/reviewWrite',{state : "주문아이디"})}>리뷰 쓰기</button> */}
      </li>
    </ul>
  );
};

export default Order;
