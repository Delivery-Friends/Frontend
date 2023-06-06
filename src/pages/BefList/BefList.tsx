import React, { useEffect, useState } from 'react';
import { ObjectList } from '../../components/ObjectList/ObjectList';
import classes from './befList.module.scss';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axiosBase';

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

export const BefList = () => {
  const navigate = useNavigate();
  const [befs, setBefs] = useState<Befs>();

  // useEffect(() => {
  //   axios.get('/data/objectList/befs.json').then(res => setBefs(res.data));
  // }, []);

  useEffect(() => {
    instance
      .get('/teamlist?page=&&size=')
      .then(res => setBefs(res.data.payload));
  }, []);

  return (
    <div className={classes.befList}>
      <ObjectList
        stores={undefined}
        befs={befs}
        likedStore={undefined}
        users={undefined}
      />
      <div className={classes.mapBtn} onClick={() => navigate('/befMap')}>
        <div>
          <FaMapMarkedAlt fill="#5f4ef7" />
        </div>
      </div>
      <div
        className={classes.plusBtn}
        onClick={() => navigate('/storeList', { state: '' })}
      >
        <div>
          <BsFillPlusCircleFill />
        </div>
      </div>
    </div>
  );
};

export default BefList;
