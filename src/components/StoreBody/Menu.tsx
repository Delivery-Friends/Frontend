import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import classes from './menu.module.scss';

type Menu = {
  id: number;
  name: string;
  price: number;
  expression: string;
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

const Menu = (props: { id: string | number | undefined }) => {
  const { id } = props;
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu>();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/store/menu/${id}`)
      .then(res => setMenu(res.data.payload));
  }, []);

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
                  onClick={() =>
                    navigate('/foodOption', {
                      state: { ...obj, storeId: id },
                    })
                  }
                >
                  <div>
                    <div className={classes.name}>{obj.name}</div>
                    <div className={classes.descript}>{obj.expression}</div>
                    <div className={classes.price}>
                      {obj.price.toLocaleString()}원
                    </div>
                  </div>
                  <img src="/image/brandLogo/bbqLogo.png" alt="food_image" />
                </div>
              );
            })}
        </li>
      </ul>
      <div className={classes.bottomBar}>
        <button>
          {/* <div className={classes.count}>2</div>  */}
          <div>장바구니 보기</div>
          {/* <div className={classes.totalPrice}>43,500 원</div> */}
        </button>
      </div>
    </div>
  );
};

export default Menu;
