import React from 'react';
import { ObjectList } from '../../components/ObjectList/ObjectList';
import classes from './storeList.module.scss';

const StoreList = () => {
  return (
    <div className={classes.WrapStoreList}>
      <div className={classes.wrapCategoryBar}>
        <ul className={classes.categoryBar}>
          <li>
            <span className={classes.selected}>전체</span>
          </li>
          <li>
            <span>한식</span>
          </li>
          <li>
            <span>중식</span>
          </li>
          <li>
            <span>일식</span>
          </li>
        </ul>
      </div>
      <ul className={classes.sortingBar}>
        <li className={classes.selected}>거리순</li>
        <li>주문량순</li>
        <li>평점순</li>
        <li>리뷰순</li>
      </ul>
      <div className={classes.wrapList}>
        <ObjectList />
      </div>
    </div>
  );
};

export default StoreList;
