import React from 'react';
import StoreBody from '../../components/StoreBody/StoreBody';
import classes from './befDetail.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

const BefDetail = () => {
  const { state } = useLocation();
  const bef = state;

  return (
    <div className={classes.wrapBefDetail}>
      <div className={classes.befInfo}>
        <div className={classes.objectLeft}>
          <img src={bef.leaderImgSrc[0]} alt="brandLogo" />
        </div>
        <div className={classes.objectRight}>
          <div className={classes.objectTop}>
            <div className={classes.befName}>{bef.leaderName}</div>
            {/* <AiFillStar className={classes.star} />
            <span className={classes.userStars}>
              3.9
              <span className={classes.review}>(10)</span>
            </span> */}
          </div>
          <div className={classes.objectMid}>
            참여인원{' '}
            <span className={classes.participants}>{bef.maxMember}</span> 명
          </div>
          <div className={classes.objectBottom}>
            <a
              href={`https://map.kakao.com/link/search/${bef.basicAddress}`}
              target="_blank"
              className={classes.location}
            >
              {bef.basicAddress}
            </a>
            | 마감 시간 :{' '}
            <span className={classes.deadline}>
              {bef.groupEndTime.substring(0, 10)}
            </span>
          </div>
        </div>
      </div>
      <StoreBody id={bef.storeId} />
    </div>
  );
};

export default BefDetail;
