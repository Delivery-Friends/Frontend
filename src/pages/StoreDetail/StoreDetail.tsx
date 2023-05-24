import React, { useState } from 'react';
import classes from './storeDetail.module.scss';
import { BsTelephone, BsHeart } from 'react-icons/bs';
import { CiShare1 } from 'react-icons/ci';
import ReactStars from 'react-stars';
import Menu from './Menu';
import Infomation from './Infomation';
import Reviews from './Reviews';

const StoreDetail = () => {
  const [tap, setTap] = useState(1);
  return (
    <div className={classes.wrapStoreDetail}>
      <div className={classes.storeInfo}>
        <div className={classes.title}>상점 이름</div>
        <div className={classes.score}>
          <ReactStars count={5} value={4.9} size={17} color2={'#F9BF25'} />
          <span>4.9</span>
        </div>
        <span>최근리뷰 33</span>
        <ul className={classes.contact}>
          <li>
            <span>
              <BsTelephone className={classes.icon} />
              전화
            </span>
          </li>
          <li>
            <span>
              <BsHeart className={classes.icon} />
              651
            </span>
          </li>
          <li>
            <span>
              <CiShare1 className={classes.icon} />
              공유
            </span>
          </li>
        </ul>
      </div>
      <ul className={classes.deliveryInfo}>
        <li>
          최소주문금액 <span>12000원</span>
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
          <li
            onClick={() => setTap(1)}
            className={tap === 1 ? classes.selected : ''}
          >
            메뉴
          </li>
          <li
            onClick={() => setTap(2)}
            className={tap === 2 ? classes.selected : ''}
          >
            정보
          </li>
          <li
            onClick={() => setTap(3)}
            className={tap === 3 ? classes.selected : ''}
          >
            리뷰
          </li>
        </ul>
        <div className={classes.content}>
          {tap === 1 && <Menu />}
          {tap === 2 && <Infomation />}
          {tap === 3 && <Reviews />}
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
