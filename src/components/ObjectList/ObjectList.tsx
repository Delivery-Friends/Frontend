import React from 'react';
import classes from './objectList.module.scss';
import { AiFillStar } from 'react-icons/ai';

export const ObjectList = () => {
  return (
    <ul className={classes.objectList}>
      <li className="object">
        <div className={classes.objectLeft}>
          <img src="/image/brandLogo/bhcLogo.png" alt="brandLogo" />
        </div>
        <div className={classes.objectRight}>
          <div className={classes.objectTitle}>bhc 아주대점</div>
          <div className={classes.score}>
            <AiFillStar className={classes.star} />
            <span>
              4.9<span className={classes.review}>(+30)</span>
            </span>
          </div>
          <div className={classes.objectMid}>
            배달 39~54분 | 배달팀 0원 ~ 3,000원
          </div>
          <div className={classes.objectBottom}>최소주문 12,000원</div>
        </div>
      </li>
    </ul>
  );
};
