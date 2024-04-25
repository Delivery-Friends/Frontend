import { useEffect, useState } from 'react';
import StoreBody from '../../components/StoreBody/StoreBody';
import classes from './befDetail.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { accessInstance } from '../../api/axiosBase';
import { getCookie } from '../../util/cookie';

type Bef =
  | {
      groupEndTime: string;
      teamId: number;
      storeId: number;
      storeName: string;
      leaderId: number;
      leaderName: string;
      leaderImgSrc: string;
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
      isJoin: boolean;
    }
  | undefined;

const BefDetail = () => {
  const navigate = useNavigate();
  const params = useParams<string>();
  const befId = params.id;
  const [bef, setBef] = useState<Bef>();
  useEffect(() => {
    if (getCookie('refreshToken')) {
      accessInstance
        .get(`/teamlist/${befId}`)
        .then(res => setBef(res.data.payload));
    } else {
      navigate('/login');
    }
  }, [befId, navigate]);

  return (
    <div>
      {bef && (
        <div className={classes.wrapBefDetail}>
          <div className={classes.befInfo}>
            <div className={classes.objectLeft}>
              <img src={bef?.leaderImgSrc} alt="brandLogo" />
            </div>
            <div className={classes.objectRight}>
              <div className={classes.objectTop}>
                <div
                  className={classes.befName}
                  onClick={() => navigate(`/userDetail/${bef.leaderId}`)}
                >
                  {bef?.leaderName}
                  {'>'}
                </div>
              </div>
              <div className={classes.objectMid}>
                참여인원{' '}
                <span className={classes.participants}>{bef?.maxMember}</span>{' '}
                명
              </div>
              <div className={classes.objectBottom}>
                <a
                  href={`https://map.kakao.com/link/search/${bef?.basicAddress}`}
                  target="_blank"
                  className={classes.location}
                  rel="noreferrer"
                >
                  {bef?.basicAddress}
                </a>
                마감 시간 :{' '}
                <span className={classes.deadline}>
                  {bef?.groupEndTime.substring(0, 10) +
                    '/' +
                    bef?.groupEndTime.substring(11, 16)}
                </span>
              </div>
            </div>
          </div>
          <StoreBody
            id={bef?.storeId}
            isJoin={bef?.isJoin}
            teamId={bef.teamId}
          />
        </div>
      )}
    </div>
  );
};

export default BefDetail;
