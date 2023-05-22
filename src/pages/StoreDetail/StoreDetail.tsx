import React from 'react';
import classes from './storeDetail.module.scss';
import { BsTelephone, BsHeart } from 'react-icons/bs';
import { CiShare1 } from 'react-icons/ci';
import ReactStars from 'react-stars';

const StoreDetail = () => {
  return (
    <div className={classes.wrapStoreDetail}>
      <div className={classes.storeInfo}>
        <div className={classes.title}>상점 이름</div>
        <div className={classes.score}>
          <ReactStars count={5} value={4.9} size={17} color2={'#F9BF25'} />{' '}
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
          <li>메뉴</li>
          <li>정보</li>
          <li>리뷰</li>
        </ul>
        <div className={classes.content}>
          <div className={classes.category}>title</div>
          {/* 이중 map돌려야할듯 카테고리-음식,음식,음식.. 카테코리2-음식,음식... */}
          <div className={classes.food}>
            <div>
              <div className={classes.name}>음식이름</div>
              <div className={classes.descript}>음식설명</div>
              <div className={classes.price}>10,000원</div>
            </div>
            <img src="/image/brandLogo/bbqLogo.png" alt="food_image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
