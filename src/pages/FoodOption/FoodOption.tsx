import React, { useState } from 'react';
import classes from './foodOption.module.scss';

const FoodOption = () => {
  const [amount, setAmount] = useState(1);
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
      <div className={classes.quantity}>
        <div className={classes.title}>수량</div>
        <div className={classes.wrapBtn}>
          <button
            onClick={() => {
              if (amount === 1) {
                alert('1개 미만은 주문하실 수 없습니다.');
              } else {
                setAmount(amount - 1);
              }
            }}
          >
            -
          </button>
          <div>{amount}</div>
          <button
            onClick={() => {
              if (amount === 10) {
                alert('10개 이상 주문하실 수 없습니다.');
              } else {
                setAmount(amount + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className={classes.bottomBar}>
        <div className={classes.left}>
          <span>배달최소주문금액</span>
          <span className={classes.leatPrice}>10,000원</span>
        </div>
        <button>18,000원 담기</button>
      </div>
    </div>
  );
};

export default FoodOption;
