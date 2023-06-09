import React, { useEffect, useState } from 'react';
import classes from './storeBody.module.scss';
import { BsTelephone, BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { CiShare1 } from 'react-icons/ci';
import { IoIosPeople } from 'react-icons/io';
import ReactStars from 'react-stars';
import Menu from './Menu';
import Infomation from './Infomation';
import Reviews from './Reviews';
import { useNavigate } from 'react-router-dom';
import { accessInstance } from '../../api/axiosBase';

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
  isLike: boolean;
};

const StoreBody = (props: {
  id: string | number | undefined;
  isJoin: boolean | undefined;
  teamId: number | undefined;
}) => {
  const { id, isJoin, teamId } = props;
  const navigator = useNavigate();
  const [tap, setTap] = useState(1);
  const [store, setStore] = useState<StoreType>();
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>();

  useEffect(() => {
    accessInstance.get(`/store/${id}`).then(res => {
      setStore(res.data.payload);
      setLikeCount(res.data.payload.likeCount);
      setLike(res.data.payload.isLike);
    });
  }, [id]);

  return (
    <div className={classes.wrapStoreBody}>
      <div className={classes.storeInfo}>
        <div className={classes.title}>{store?.name}</div>
        <div className={classes.score}>
          <ReactStars
            count={5}
            value={store?.reviewScore}
            size={17}
            color2="#F9BF25"
            edit={false}
          />
          <span>{store?.reviewScore.toString().substring(0, 3)}</span>
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
              {like ? (
                <BsFillHeartFill
                  className={classes.icon}
                  onClick={() => {
                    if (localStorage.getItem('refreshToken')) {
                      accessInstance
                        .post(`/user/store/dislike/${store?.id}`)
                        .then(res => {
                          if (res.data.statusCode === 200) {
                            setLike(!like);
                            setLikeCount((likeCount as number) - 1);
                          } else {
                            alert(res.data.message);
                          }
                        });
                    } else {
                      alert('로그인이 필요한 서비스 입니다.');
                    }
                  }}
                  style={{ fill: 'red' }}
                />
              ) : (
                <BsHeart
                  className={classes.icon}
                  onClick={() => {
                    if (localStorage.getItem('refreshToken')) {
                      accessInstance
                        .post(`/user/store/like/${store?.id}`)
                        .then(res => {
                          if (res.data.statusCode === 200) {
                            setLike(!like);
                            setLikeCount((likeCount as number) + 1);
                          } else {
                            alert(res.data.message);
                          }
                        });
                    } else {
                      alert('로그인이 필요한 서비스 입니다.');
                    }
                  }}
                />
              )}
              {likeCount}
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
          {tap === 1 && (
            <Menu id={id} store={store} isJoin={isJoin} teamId={teamId} />
          )}
          {tap === 2 && <Infomation store={store} />}
          {tap === 3 && <Reviews id={id} />}
        </div>
      </div>
    </div>
  );
};

export default StoreBody;
