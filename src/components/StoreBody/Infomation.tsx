import React from 'react';
import classes from './information.module.scss';
type StoreType =
  | {
      id: number;
      name: string;
      region1depthName: string;
      region2depthName: string;
      region3depthName: string;
      phoneNumber: string;
      intro: string;
      openTime: string;
      closeTime: string;
      registrationNumber: string;
      deliveryWaitTime: number;
      deliveryTip: number;
      packageAvailable: boolean;
      packageWaitTime: number;
      reviewScore: number;
      reviewCount: number;
      orderCount: number;
      minPrice: number;
      likeCount: number;
    }
  | undefined;

const Infomation = (props: { store: StoreType }) => {
  const { store } = props;
  return (
    <ul className={classes.information}>
      <li className={classes.section}>
        <span className={classes.title}>가게 소개</span>
        <div className={classes.intro}>{store?.intro}</div>
      </li>
      <li className={classes.section}>
        <span className={classes.title}>영업 정보</span>
        <ul>
          <li>
            상호명<span>{store?.name}</span>
          </li>
          <li>
            운영시간
            <span>
              매일 - {store?.openTime} ~ {store?.closeTime}
            </span>
          </li>
          <li>
            휴무일<span>연중무휴</span>
          </li>
          <li>
            전화번호<span>050-000-0000</span>
          </li>
          <li>
            배달지역<span>매장반경 3km</span>
          </li>
        </ul>
      </li>
      <li className={classes.section}>
        <span className={classes.title}>가게 통계</span>
        <ul>
          {/* <li>
            최근 주문수<span>2,000+</span>
          </li> */}
          <li>
            전체 리뷰수<span>{store?.reviewCount}+</span>
          </li>
          <li>
            찜<span>{store?.likeCount}</span>
          </li>
        </ul>
      </li>
      <li className={classes.section}>
        <span className={classes.title}>사업자 정보</span>
        <ul>
          <li>
            대표자명<span>홍길동</span>
          </li>
          <li>
            상호명<span>{store?.name}</span>
          </li>
          <li>
            사업자주소
            <span>
              {store?.region1depthName} {store?.region2depthName}{' '}
              {store?.region3depthName}
            </span>
          </li>
          <li>
            사업자등록번호<span>{store?.registrationNumber}</span>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Infomation;
