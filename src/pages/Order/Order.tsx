import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessInstance } from '../../api/axiosBase';
import classes from './order.module.scss';

type OrderListType = [
  {
    storeName: string;
    storeId: number;
    medium: string[];
    leaderId: number;
    orderInfo: string;
    createdDate: string;
    menuInfo: string;
    price: number;
    deliveryTip: number;
    orderId: number;
    isStoreReviewWrite: boolean;
    isUserReviewWrite: boolean;
  }
];

const Order = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState<OrderListType>();
  useEffect(() => {
    accessInstance('user/order').then(res => setOrderList(res.data.payload));
  }, []);
  return (
    <ul className={classes.wrapOrder}>
      {orderList?.map((obj, index) => {
        return (
          <li key={index} className={classes.orderItem}>
            <div className={classes.top}>
              <div className={classes.date}>
                {obj.createdDate.substring(0, 10)}
              </div>
              <div className={classes.state}>• {obj.orderInfo}</div>
            </div>
            <div className={classes.mid}>
              <img src={obj.medium[0]} alt="store_img" />
              <div className={classes.info}>
                <div
                  className={classes.name}
                  onClick={() => navigate(`/storeDetail/${obj.storeId}`)}
                >
                  {obj.storeName} {'>'}
                </div>
                <div className={classes.orderInfo}>
                  <div className={classes.menu}>{obj.menuInfo}</div>
                  {/* menuInfo로 한번에 옴 <div className={classes.quantity}></div> */}
                  {/* 총금액 */}
                  <div className={classes.price}>
                    {(obj.price + obj.deliveryTip).toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
            {obj.orderInfo === '팀 결제 완료' && (
              <div className={classes.wrapBtn}>
                {obj.isStoreReviewWrite === false && (
                  <button
                    onClick={() =>
                      navigate('/reviewWrite', {
                        state: { orderId: obj.orderId, leaderId: undefined },
                      })
                    }
                  >
                    상점 리뷰 쓰기
                  </button>
                )}
                {obj.isUserReviewWrite === false && (
                  <button
                    onClick={() =>
                      navigate('/reviewWrite', {
                        state: { orderId: undefined, leaderId: obj.leaderId },
                      })
                    }
                  >
                    배프 리뷰 쓰기
                  </button>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Order;
