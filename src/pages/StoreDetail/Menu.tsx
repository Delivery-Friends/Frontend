import React from 'react';
import classes from './menu.module.scss';

const Menu = () => {
  return (
    <div className={classes.menu}>
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
    </div>
  );
};

export default Menu;
