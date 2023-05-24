import React from 'react';
import classes from './information.module.scss';

const Infomation = () => {
  return (
    <ul className={classes.information}>
      <li className={classes.section}>
        <span className={classes.title}>가게 소개</span>
        <div className={classes.intro}>가게 소개글....</div>
      </li>
      <li className={classes.section}>
        <span className={classes.title}>영업 정보</span>
        <ul>
          <li>
            상호명<span>가계이름</span>
          </li>
          <li>
            운영시간<span>매일 - 오전 10:30 ~ 익일 새벽 2:00</span>
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
          <li>
            최근 주문수<span>2,000+</span>
          </li>
          <li>
            전체 리뷰수<span>1,000+</span>
          </li>
          <li>
            찜<span></span>2,177
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
            상호명<span>상호이름</span>
          </li>
          <li>
            사업자주소<span>경기도 수원시 아주대</span>
          </li>
          <li>
            사업자등록번호<span>000-00-00000</span>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Infomation;
