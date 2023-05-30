import React from 'react';
import classes from './objectList.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

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
type Befs = [
  {
    id: number;
    storeName: string;
    storeStars: number;
    storeReviews: number;
    participants: number;
    userName: string;
    userStars: number;
    userReview: number;
    location: string;
    deadLine: number;
    fileNames: [
      {
        filename: string;
      }
    ];
  }
];
interface Props {
  // setUser: React.Dispatch<React.SetStateAction<Rank[]>>;
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
            onClick={() => navigate(`/befDetail/${obj.id}`)}
          >
            <div className={classes.objectLeft}>
              <img src={obj.fileNames[0].filename} alt="brandLogo" />
            </div>
            <div className={classes.objectRight}>
              <div className={classes.objectTitle}>{obj.storeName}</div>
              <div className={classes.score}>
                <AiFillStar className={classes.star} />
                <span>
                  {obj.storeStars}
                  <span className={classes.review}>(+{obj.storeReviews})</span>
                </span>
              </div>
              <div className={classes.objectMid}>
                참여인원{' '}
                <span className={classes.participants}>{obj.participants}</span>{' '}
                명 | 대표배프 :
                <div className={classes.befName}>{obj.userName}</div>
                <AiFillStar className={classes.star} />
                <span className={classes.userStars}>
                  {obj.userStars}
                  <span className={classes.review}>({obj.userReview})</span>
                </span>
              </div>
              <div className={classes.objectBottom}>
                <span className={classes.location}>{obj.location}</span>| 마감
                시간 : <span className={classes.deadline}>{obj.deadLine}</span>
                분
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
