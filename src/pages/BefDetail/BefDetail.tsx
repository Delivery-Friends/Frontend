import React from 'react';
import StoreBody from '../../components/StoreBody/StoreBody';
import classes from './befDetail.module.scss';
import { AiFillStar } from 'react-icons/ai';

const BefDetail = () => {
  return (
    <div className={classes.wrapBefDetail}>
      <div className={classes.befInfo}>
        <div className={classes.objectLeft}>
          <img src="/image/brandLogo/bbqLogo.png" alt="brandLogo" />
        </div>
        <div className={classes.objectRight}>
          <div className={classes.objectTop}>
            <div className={classes.befName}>배프이름</div>
            <AiFillStar className={classes.star} />
            <span className={classes.userStars}>
              3.9
              <span className={classes.review}>(10)</span>
            </span>
          </div>
          <div className={classes.objectMid}>
            참여인원 <span className={classes.participants}>3</span> 명
          </div>
          <div className={classes.objectBottom}>
            <a
              href={`https://map.kakao.com/link/search/팔달구 원천동 남제관`}
              target="_blank"
              className={classes.location}
            >
              팔달구 원천동 남제관
            </a>
            | 마감 시간 : <span className={classes.deadline}>7</span>분
          </div>
        </div>
      </div>
      <StoreBody id={1} />
    </div>
  );
};

export default BefDetail;
