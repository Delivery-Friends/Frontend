import React from 'react';
import classes from './objectList.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko'; // 한글로 변환
register('ko', koLocale);

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
type Befs = {
  groupEndTime: string;
  teamId: number;
  storeId: number;
  storeName: string;
  leaderName: string;
  leaderImgSrc: string[];
  category: string;
  storeImgUrl: string[];
  storeScore: number;
  reviewCount: number;
  deliveryTime: number;
  deliveryTip: number;
  minPrice: number;
  maxMember: number;
  basicAddress: string;
  detailedAddress: string;
  latitude: string;
  longitude: string;
}[];

interface Props {
  stores: Stores | undefined;
  befs: Befs | undefined;
}

export const ObjectList = (props: Props) => {
  const navigate = useNavigate();
  const { stores, befs } = props;

  return (
    <ul className={classes.objectList}>
      {/* storeList */}
      {stores &&
        stores.map((obj, index) => {
          return (
            <li
              key={index}
              className="object"
              onClick={() => navigate(`/storeDetail/${obj.id}`)}
            >
              <div className={classes.objectLeft}>
                {obj.fileNames.length >= 1 ? (
                  <img src={obj.fileNames[0].filename} alt="brandLogo" />
                ) : (
                  <img src={'/image/defaultImg.png'} alt="brandLogo" />
                )}
              </div>
              <div className={classes.objectRight}>
                <div className={classes.objectTitle}>{obj.name}</div>
                <div className={classes.score}>
                  <AiFillStar className={classes.star} />
                  <span>
                    {obj.reviewScore}
                    <span className={classes.review}>(+{obj.reviewCount})</span>
                  </span>
                </div>
                <div className={classes.objectMid}>
                  배달 {obj.deliveryWaitTime}분 | 배달팀{' '}
                  {obj.deliveryTip.toLocaleString()}원
                </div>
                <div className={classes.objectBottom}>
                  최소주문 {obj.minPrice.toLocaleString()}원
                </div>
              </div>
            </li>
          );
        })}
      {/* befList */}
      {befs?.map((obj, index) => {
        return (
          <li
            key={index}
            className="object"
            onClick={() => navigate(`/befDetail/${obj.teamId}`)}
          >
            <div className={classes.objectLeft}>
              <img src={obj.storeImgUrl[0]} alt="brandLogo" />
            </div>
            <div className={classes.objectRight}>
              <div className={classes.objectTitle}>{obj.storeName}</div>
              <div className={classes.score}>
                <AiFillStar className={classes.star} />
                <span>
                  {obj.storeScore}
                  <span className={classes.review}>(+{obj.reviewCount})</span>
                </span>
              </div>
              <div className={classes.objectMid}>
                참여인원{' '}
                <span className={classes.participants}>{obj.maxMember}</span> 명
                | 대표배프 :
                <div className={classes.befName}>{obj.leaderName}</div>
                {/* <AiFillStar className={classes.star} />
                <span className={classes.userStars}>
                  {obj.userStars}
                  <span className={classes.review}>({obj.userReview})</span>
                </span> */}
              </div>
              <div className={classes.objectBottom}>
                <span className={classes.location}>{obj.basicAddress}</span>
                마감 시간 :{' '}
                <span className={classes.deadline}>
                  {format(obj.groupEndTime, 'ko')}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
