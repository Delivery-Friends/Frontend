import React, { useEffect, useState } from 'react';
import { ObjectList } from '../../components/ObjectList/ObjectList';
import classes from './storeList.module.scss';
import axios from 'axios';
import { instance } from '../../api/axiosBase';

type Stores = [
  {
    id: number;
    name: string;
    deliveryWaitTime: number;
    packageAvailable: boolean;
    packageWaitTime: number;
    deliveryTip: number;
    reviewScore: number;
    reviewCount: number;
    minPrice: number;
    fileNames: [
      {
        filename: string;
      }
    ];
  }
];

const StoreList = () => {
  const [stores, setStores] = useState<Stores>();
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('orderCount,Desc');

  useEffect(() => {
    axios.get('/data/objectList/stores.json').then(res => setStores(res.data));
  }, []);
  // useEffect(() => {
  //   instance
  //     .get(`/stores?category=${category}&&sort=${sort}`)
  //     .then(res => setStores(res.data.payload));
  // }, [category, sort]);

  return (
    <div className={classes.WrapStoreList}>
      <div className={classes.wrapCategoryBar}>
        <ul className={classes.categoryBar}>
          <li onClick={() => setCategory('')}>
            <span className={category === '' ? classes.selected : ''}>
              전체
            </span>
          </li>
          <li onClick={() => setCategory('한식')}>
            <span className={category === '한식' ? classes.selected : ''}>
              한식
            </span>
          </li>
          <li onClick={() => setCategory('중식')}>
            <span className={category === '중식' ? classes.selected : ''}>
              중식
            </span>
          </li>
          <li onClick={() => setCategory('일식')}>
            <span className={category === '일식' ? classes.selected : ''}>
              일식
            </span>
          </li>
          <li onClick={() => setCategory('양식')}>
            <span className={category === '양식' ? classes.selected : ''}>
              양식
            </span>
          </li>
          <li onClick={() => setCategory('치킨')}>
            <span className={category === '치킨' ? classes.selected : ''}>
              치킨
            </span>
          </li>
          <li onClick={() => setCategory('피자')}>
            <span className={category === '피자' ? classes.selected : ''}>
              피자
            </span>
          </li>
          <li onClick={() => setCategory('분식')}>
            <span className={category === '분식' ? classes.selected : ''}>
              분식
            </span>
          </li>
        </ul>
      </div>
      <ul className={classes.sortingBar}>
        <li
          onClick={() => setSort('orderCount,Desc')}
          className={sort === 'orderCount,Desc' ? classes.selected : ''}
        >
          주문량순
        </li>
        {/* <li>평점순</li> */}
        <li
          onClick={() => setSort('reviewCount,Desc')}
          className={sort === 'reviewCount,Desc' ? classes.selected : ''}
        >
          리뷰순
        </li>
        <li
          onClick={() => setSort('deliveryTip,Asc')}
          className={sort === 'deliveryTip,Asc' ? classes.selected : ''}
        >
          배달팁순
        </li>
      </ul>
      <div className={classes.wrapList}>
        {stores && <ObjectList stores={stores} befs={undefined} />}
      </div>
    </div>
  );
};

export default StoreList;
