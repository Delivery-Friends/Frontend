import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import classes from './payment.module.scss';
import Button from '../../components/common/Button/Button';
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = params.get('amount');
  const customerName = params.get('customerName');

  const [paymentData, setPaymentData] = useState([]);

  const moveHomePageHandler = () => {
    navigate('/');
  };

  useEffect(() => {
    const data = {
      paymentKey: paymentKey,
      amount: Number(amount),
      orderId: orderId,
      customerName: customerName,
    };
    console.log(data);
    axios
      .post('https://api.tosspayments.com/v1/payments/confirm', data, {
        headers: {
          Authorization:
            'Basic dGVzdF9za19QMjR4TGVhNXpWQUExMmRBSmtZVlFBTVlOd1c2Og==',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        setPaymentData(res.data);
        return res;
      });
  }, [amount, paymentKey, orderId]);

  return (
    paymentData && (
      <div className={classes.paymentwrapper}>
        <div className={classes.require}>
          <p>총 결제금액</p>
          <span>{`${Number(amount).toLocaleString()}원`}</span>
        </div>
        <div className={classes.require}>
          <p>주문 메뉴</p>
          <span>BBQ 뿌링클치킨</span>
        </div>
        <p className={classes.success}>주문에 성공하였습니다.</p>
        <Button size="lg" onClick={moveHomePageHandler}>
          홈페이지로 이동
        </Button>
      </div>
    )
  );
};

export default PaymentSuccess;
