import React, { useEffect, useState } from 'react';
import { ObjectList } from '../../components/ObjectList/ObjectList';
import classes from './storeList.module.scss';
import axios from 'axios';

type Stores = [
  {
    id: number;
    name: string;
    deliveryWaitTime: number;
    packageAvailable: boolean;
    packageWaitTime: number;
    deliveryTip: number;
    stars: number;
    reviews: number;
    listPrice: number;
    fileNames: [
      {
        filename: string;
      }
    ];
  }
];

const StoreList = () => {
  const [stores, setStores] = useState<Stores>();

  useEffect(() => {
    axios.get('/data/objectList/stores.json').then(res => setStores(res.data));
  }, []);

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
          <li>
            <span>야식</span>
          </li>
          <li>
            <span>치킨</span>
          </li>
          <li>
            <span>피자</span>
          </li>
          <li>
            <span>분식</span>
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
        <ObjectList stores={stores} befs={undefined} />
      </div>
    </div>
  );
};

export default StoreList;
