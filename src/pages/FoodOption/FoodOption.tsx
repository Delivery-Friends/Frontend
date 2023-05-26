import React from 'react';
import classes from './foodOption.module.scss';

const FoodOption = () => {
  return (
    <div className={classes.foodOption}>
      <img src="/image/brandLogo/bbqLogo.png" alt="food_img" />
      <div className={classes.info}>
        <div className={classes.name}>음식이름</div>
        <div className={classes.description}>음식 설명</div>
        <div className={classes.foodPrice}>
          가격
          <div className={classes.price}>28,900원</div>
        </div>
      </div>
      <div className={classes.options}>
        <div className={classes.option}>
          <div className={classes.title}>
            옵션이름 <div className={classes.required}>필수</div>
          </div>
          <ul>
            <li>
              <input type="radio" name="옵션이름" value="옵션내용" />
              <div className={classes.choice}>옵션내용1</div>
              <span className={classes.addPrice}>+2,000원</span>
            </li>
            <li>
              <input type="radio" name="옵션이름" value="옵션내용" />
              <div className={classes.choice}>옵션내용2</div>
              <span className={classes.addPrice}>+2,000원</span>
            </li>
          </ul>
        </div>
        <div className={classes.option}>
          <div className={classes.title}>
            옵션이름 <div>선택</div>
          </div>
          <ul>
            <li>
              <input type="checkbox" name="옵션이름" value="옵션내용" />
              <div className={classes.choice}>옵션내용1</div>
              <span className={classes.addPrice}>+2,000원</span>
            </li>
            <li>
              <input type="checkbox" name="옵션이름" value="옵션내용" />
              <div className={classes.choice}>옵션내용2</div>
              <span className={classes.addPrice}>+2,000원</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoodOption;
