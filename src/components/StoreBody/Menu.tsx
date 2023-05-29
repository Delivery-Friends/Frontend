import React from 'react';
import classes from './menu.module.scss';

const Menu = () => {
  return (
    <div className={classes.menuList}>
      <ul className={classes.menus}>
        <li className={classes.menu}>
          <div className={classes.category}>title</div>
          {/* 이중 map돌려야할듯 카테고리-음식,음식,음식.. 카테코리2-음식,음식... */}
          <div className={classes.food}>
            <div>
              <div className={classes.name}>음식이름</div>
              <div className={classes.descript}>음식설명</div>
              <div className={classes.price}>10,000원</div>
            </div>
            <img src="/image/brandLogo/bbqLogo.png" alt="food_image" />
          </div>
        </li>
      </ul>
      <div className={classes.bottomBar}>
        <button>
          <div className={classes.count}>2</div> <div>장바구니 보기</div>
          <div className={classes.totalPrice}>43,500 원</div>
        </button>
      </div>
    </div>
  );
};

export default Menu;
