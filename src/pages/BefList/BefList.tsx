import React, { useEffect, useState } from 'react';
import { ObjectList } from '../../components/ObjectList/ObjectList';
import classes from './befList.module.scss';
import axios from 'axios';
import { RiMap2Fill } from 'react-icons/ri';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export type Befs = [
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

const BefList = () => {
  const navigate = useNavigate();
  const [befs, setBefs] = useState<Befs>();

  useEffect(() => {
    axios.get('/data/objectList/befs.json').then(res => setBefs(res.data));
  }, []);

  return (
    <div className={classes.befList}>
      <ObjectList stores={undefined} befs={befs} />
      <button className={classes.mapBtn} onClick={() => navigate('/befMap')}>
        <RiMap2Fill />
      </button>
      <div className={classes.plusBtn} onClick={() => navigate('/storelist')}>
        <BsFillPlusCircleFill />
      </div>
    </div>
  );
};

export default BefList;
