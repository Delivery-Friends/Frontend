import React from 'react';
import classes from './objectList.module.scss';

export const ObjectList = () => {
  return (
    <ul className={classes.objectList}>
      <li className="object">
        <div className={classes.objectLeft}>
          <img src="/image/brandLogo/bhcLogo.png" alt="brandLogo" />
        </div>
        <div className={classes.objectRight}>
          <div className={classes.objectTitle}>이름</div>
          <div className={classes.score}>별점</div>
          <div className={classes.objectMid}>중간</div>
          <div className={classes.objectBottom}>마지막</div>
        </div>
      </li>
    </ul>
  );
};
