import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessInstance, instance } from '../../api/axiosBase';
import classes from './menu.module.scss';

type MenuType = {
  id: number;
  name: string;
  price: number;
  expression: string;
  medium: string[];
  readMenuOptionGroupList: {
    id: number;
    name: string;
    multiSelect: number;
    readMenuOptionList: {
      id: number;
      name: string;
      price: number;
      maxCount: number;
      defaultValue: number;
    }[];
  }[];
}[];

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
      medium: string[];
      isLike: boolean;
    }
  | undefined;

const Menu = (props: {
  id: string | number | undefined;
  store: StoreType;
  isJoin: boolean | undefined;
  teamId: number | undefined;
}) => {
  const { id, store, isJoin, teamId } = props;
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuType>();

  useEffect(() => {
    instance.get(`/store/menu/${id}`).then(res => setMenu(res.data.payload));
  }, [id]);
  return (
    <div className={classes.menuList}>
      <ul className={classes.menus}>
        <li className={classes.menu}>
          {/* <div className={classes.category}>title</div> */}
          {/* 이중 map돌려야할듯 카테고리-음식,음식,음식.. 카테코리2-음식,음식... */}
          {menu &&
            menu.map((obj, index) => {
              return (
                <div
                  key={index}
                  className={classes.food}
                  onClick={() => {
                    if (window.location.href.includes('befDetail')) {
                      if (isJoin === true) {
                        navigate('/foodOption', {
                          state: { ...obj, storeId: id },
                        });
                      } else {
                        alert('배프참여를 먼저 해주세요.');
                      }
                    } else {
                      alert('배프등록을 먼저 해주세요.');
                    }
                  }}
                >
                  <div>
                    <div className={classes.name}>{obj.name}</div>
                    <div className={classes.descript}>{obj.expression}</div>
                    <div className={classes.price}>
                      {obj.price.toLocaleString()}원
                    </div>
                  </div>
                  <img src={obj.medium[0]} alt="food_image" />
                </div>
              );
            })}
        </li>
      </ul>
      {window.location.href.includes('storeDetail') && (
        <div className={classes.bottomBar}>
          <button
            onClick={() => navigate('/befRegistRation', { state: store })}
          >
            <div>배프등록하러 가기</div>
          </button>
        </div>
      )}
      {window.location.href.includes('befDetail') && isJoin === false && (
        <div className={classes.bottomBar}>
          <button
            onClick={() =>
              accessInstance
                .post('/team/join', { teamId: teamId })
                .then(res => {
                  if (res.data.statusCode === 200) {
                    window.location.reload();
                  } else {
                    alert(res.data.message);
                  }
                })
            }
          >
            <div>배프 참여하기</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
