import React from 'react';
import classes from './storeDetail.module.scss';

const StoreDetail = () => {
  return (
    <div className={classes.wrapStoreDetail}>
      <div className={classes.storeInfo}>
        <div className={classes.title}>상점 이름</div>
        <div className={classes.score}>별별별별별 4.9</div>
        <span>최근리뷰 33</span>
        <ul className={classes.contact}>
          <li>전화</li>
          <li>하트651</li>
          <li>공유</li>
        </ul>
      </div>
      <ul className={classes.deliveryInfo}>
        <li>
          최소주문 금액 <span>12000원</span>
        </li>
        <li>
          배달시간 <span>12000원</span>
        </li>
        <li>
          배달팁
          <span>
            0원 ~ 3000원 <button>자세히</button>
          </span>
        </li>
      </ul>
      <div className={classes.wrapBottom}>
        <ul className={classes.tapMenu}>
          <li>메뉴</li>
          <li>정보</li>
          <li>리뷰</li>
        </ul>
        <div className={classes.content}>content</div>
      </div>
    </div>
  );
};

export default StoreDetail;
