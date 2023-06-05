import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './foodOption.module.scss';
import { accessInstance } from '../../api/axiosBase';

// type Menu = {
//   id: number;
//   name: string;
//   price: number;
//   expression: string;
//   readMenuOptionGroupList: {
//     id: number;
//     name: string;
//     multiSelect: number;
//     readMenuOptionList: {
//       id: number;
//       name: string;
//       price: number;
//       maxCount: number;
//       defaultValue: number;
//     }[];
//   }[];
// }[];

// type Option = {
//   id: number;
//   name: string;
//   multiSelect: number;
//   readMenuOptionList: {
//     id: number;
//     name: string;
//     price: number;
//     maxCount: number;
//     defaultValue: number;
//   }[];
// }[];

const FoodOption = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);
  const { state } = useLocation();
  const menu = state;
  const [choiceOption, setChoiceOption] = useState<any>({});
  useEffect(() => {
    menu.readMenuOptionGroupList.map((obj: any) => {
      obj.readMenuOptionList.map((objs: any) => {
        let option: any = choiceOption;
        option[objs.id] = objs.defaultValue;
        setChoiceOption(option);
      });
    });
  }, []);

  const addCart = () => {
    //나중에 카드에 담을때 실행하면 될듯
    const arrs = Object.entries(choiceOption).map(arr => {
      return { menuOptionId: arr[0], count: arr[1] };
    });
    accessInstance
      .post(
        `/user/cart/add`,

        {
          storeId: menu.storeId,
          menu: [
            {
              menuId: menu.id,
              count: amount,
              choiceOption: arrs,
            },
          ],
        }
      )
      .then(res => {
        if (res.data.statusCode === 200) {
          navigate('/cart');
        } else {
          alert('장바구니 추가에 실패하였습니다.');
        }
      });
  };

  // const amountChange = (id:any) => {
  //   if(choiceOption[id]==='0'){
  //     setChoiceOption({...choiceOption,})
  //   }
  // }
  return (
    <div className={classes.foodOption}>
      <img src={menu.medium[0]} alt="food_img" />
      <div className={classes.info}>
        <div className={classes.name}>{menu.name}</div>
        <div className={classes.description}>{menu.expression}</div>
        <div className={classes.foodPrice}>
          가격
          <div className={classes.price}>{menu.price.toLocaleString()}원</div>
        </div>
      </div>
      <div className={classes.options}>
        {menu.readMenuOptionGroupList.length > 0 &&
          menu.readMenuOptionGroupList.map((obj: any, index: number) => {
            if (obj.multiSelect === 0) {
              return (
                <div key={index} className={classes.option}>
                  <div className={classes.title}>
                    {obj.name} <div className={classes.required}>필수</div>
                  </div>
                  <ul>
                    {obj.readMenuOptionList.map((objs: any, indexs: number) => {
                      return (
                        <li key={indexs}>
                          <input
                            type="radio"
                            name={obj.name}
                            value={objs.name}
                            onChange={() => {
                              if (choiceOption[objs.id] === 0) {
                                setChoiceOption({
                                  ...choiceOption,
                                  [objs.id]: 1,
                                });
                              } else {
                                setChoiceOption({
                                  ...choiceOption,
                                  [objs.id]: 0,
                                });
                              }
                            }}
                          />
                          <div className={classes.choice}>{objs.name}</div>
                          <span className={classes.addPrice}>
                            +{objs.price.toLocaleString()}원
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else {
              return (
                <div key={index} className={classes.option}>
                  <div className={classes.title}>
                    {obj.name} <div>선택</div>
                  </div>
                  <ul>
                    {obj.readMenuOptionList.map((objs: any, indexs: number) => {
                      return (
                        <li key={indexs}>
                          <input
                            type="checkbox"
                            name={obj.name}
                            value={objs.name}
                            onClick={() => {
                              if (choiceOption[objs.id] === 0) {
                                setChoiceOption({
                                  ...choiceOption,
                                  [objs.id]: 1,
                                });
                              } else {
                                setChoiceOption({
                                  ...choiceOption,
                                  [objs.id]: 0,
                                });
                              }
                            }}
                          />
                          <div className={classes.choice}>{objs.name}</div>
                          <span className={classes.addPrice}>
                            +{objs.price.toLocaleString()}원
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })}
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
        <button
          onClick={() => {
            addCart();
          }}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default FoodOption;
