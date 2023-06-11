import React, { useEffect, useState } from 'react';
import classes from './likedStore.module.scss';
import { accessInstance } from '../../api/axiosBase';
import { ObjectList } from '../../components/ObjectList/ObjectList';

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

type Users = [
  {
    userId: number;
    nickname: string;
    name: string;
    imgSrc: string;
    score: number;
    reviewCount: number;
  }
];

const LikedStore = () => {
  const [stores, setStores] = useState<Stores>();
  const [users, setUsers] = useState<Users>();
  const [tap, setTap] = useState('찜한가게');
  useEffect(() => {
    const api = async () => {
      const storelistres = await accessInstance.get(`/user/store/list`);
      setStores(storelistres.data.payload);
      const likelistres = await accessInstance.get(`/user/likelist`);
      setUsers(likelistres.data.payload);
    };
    api();
  }, []);
  return (
    <div className={classes.wrapLikedStore}>
      <div className={classes.wrapBtn}>
        <button
          className={tap === '찜한가게' ? classes.selected : ''}
          onClick={() => setTap('찜한가게')}
        >
          찜한가게
        </button>
        <button
          className={tap === '찜한배프' ? classes.selected : ''}
          onClick={() => setTap('찜한배프')}
        >
          찜한배프
        </button>
      </div>
      {tap === '찜한배프' ? (
        <ObjectList
          stores={undefined}
          befs={undefined}
          likedStore={undefined}
          users={users}
        />
      ) : (
        <ObjectList
          stores={undefined}
          befs={undefined}
          likedStore={stores}
          users={undefined}
        />
      )}
    </div>
  );
};

export default LikedStore;
