import React, { useEffect, useState } from 'react';
import classes from './storeBody.module.scss';
import { BsTelephone, BsHeart } from 'react-icons/bs';
import { CiShare1 } from 'react-icons/ci';
import { IoIosPeople } from 'react-icons/io';
import ReactStars from 'react-stars';
import Menu from './Menu';
import Infomation from './Infomation';
import Reviews from './Reviews';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { instance } from '../../api/axiosBase';

type StoreType = {
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
  medium: string[];
};

const StoreBody = (props: { id: string | number | undefined }) => {
  const { id } = props;
  const navigator = useNavigate();
  const [tap, setTap] = useState(1);
  const [store, setStore] = useState<StoreType>();

  useEffect(() => {
    instance.get(`/store/${id}`).then(res => setStore(res.data.payload));
  }, []);

  return (
    <div className={classes.wrapStoreBody}>
      <div className={classes.storeInfo}>
        <div className={classes.title}>{store?.name}</div>
        <div className={classes.score}>
          <ReactStars
            count={5}
            value={store?.reviewScore}
            size={17}
            color2={'#F9BF25'}
          />
          <span>{store?.reviewScore}</span>
        </div>
        <span>최근리뷰 {store?.reviewCount}</span>
        <ul className={classes.contact}>
          <li>
            <a href={`tel:${store?.phoneNumber}`}>
              <BsTelephone className={classes.icon} />
              전화
            </a>
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
          {window.location.href.includes('storeDetail') && (
            <li onClick={() => navigator('/befRegistration', { state: store })}>
              <span className={classes.bef}>
                <IoIosPeople className={classes.befIcon} />
                배프등록
              </span>
            </li>
          )}
        </ul>
      </div>
      <ul className={classes.deliveryInfo}>
        <li>
          최소주문금액 <span>{store?.minPrice.toLocaleString()}원</span>
        </li>
        <li>
          배달시간 <span>{store?.deliveryWaitTime}분</span>
        </li>
        <li>
          배달팁
          <span>
            {store?.deliveryTip.toLocaleString()}원 <button>자세히</button>
          </span>
        </li>
      </ul>
      <div className={classes.wrapBottom}>
        <ul className={classes.tapMenu}>
          <li
            onClick={() => setTap(1)}
            className={tap === 1 ? classes.selected : ''}
          >
            메뉴
          </li>
          <li
            onClick={() => setTap(2)}
            className={tap === 2 ? classes.selected : ''}
          >
            정보
          </li>
          <li
            onClick={() => setTap(3)}
            className={tap === 3 ? classes.selected : ''}
          >
            리뷰
          </li>
        </ul>
        <div className={classes.content}>
          {tap === 1 && <Menu id={id} />}
          {tap === 2 && <Infomation store={store} />}
          {tap === 3 && <Reviews id={id} />}
        </div>
      </div>
    </div>
  );
};

export default StoreBody;
