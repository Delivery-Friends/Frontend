import { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import classes from './payment.module.scss';

const Payment = () => {
  const { state } = useLocation();
  // 받아올 데이터 값 관리
  const navigate = useNavigate();

  useEffect(() => {
    loadTossPayments(process.env.REACT_APP_TOSS_API_KEY).then(tossPayments => {
      tossPayments
        .requestPayment('카드', {
          // 결제 수단
          // 결제 정보
          amount: state.amount, //제품 가격
          orderId: `${state.orderId}`, //결제 마다 고유의 주문아이디가 필요
          orderName: state.orderName, //제품이름
          customerName: state.realName, //주문자의 실명
          successUrl: 'http://localhost:3000/payment/success', //성공시 이동할 url
          failUrl: 'http://localhost:3000/payment/fail', //실패시 이동할 url
          flowMode: 'DIRECT',
          easyPay: '토스페이',
        })
        .catch(function (error) {
          console.log(error);
          if (error.code === 'USER_CANCEL') {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
            // navigate('/paymentorder/1234');
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            // 유효하지 않은 카드 코드에 대한 에러 처리
          } else if (error.code === 'DUPLICATED_ORDER_ID') {
            // 이미 처리된 주문번호에 대한 에러 처리
            navigate('/');
          }
        });
    });
  }, [state, navigate]);

  return (
    <div>
      <div className={classes.spinner}>
        <FadeLoader color="#5f4ef7" />
      </div>
    </div>
  );
};

export default Payment;
