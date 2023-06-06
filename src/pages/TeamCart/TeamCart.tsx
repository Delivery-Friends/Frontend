import { useEffect, useState } from 'react';
import { accessInstance } from '../../api/axiosBase';

import classes from './teamcart.module.scss';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';

interface TeamOrderStatus {
  nickname: string;
  status: string;
}

export interface PayInfo {
  menuInfo: string;
  price: number;
  deliveryTip: number;
  orderId: number;
  username: string;
}

const TeamCart = () => {
  const navigate = useNavigate();
  const [teamStatesData, setTeamStatesData] = useState<TeamOrderStatus[]>([]);
  const [myPayInfo, setMyPayInfo] = useState<PayInfo>();
  const [isPay, setIsPay] = useState<boolean>(false);
  const [myState, setMyState] = useState<string>();

  useEffect(() => {
    const api = async () => {
      const { data } = await accessInstance.get('team/status');
      if (data.statusCode === 200) {
        setTeamStatesData(data.payload.teamOrderStatus);
        setMyState(data.payload.myStatus);
      }
    };

    api();
  }, []);

  const teamPayHandler = async () => {
    const { data } = await accessInstance.post('/team/pay');

    if (data.statusCode === 40000) {
      alert('리더가 아닌 사람은 모집마감을 할 수 없어요.');
      return;
    } else {
      window.location.reload();
    }

    // 만약 리더가 아닌 사람이 모집마감(teamPay클릭 시) 에러 발생 리더만 사람들을 wait시킬 수 있음.
    // 팀 리더가 아닌 사람이 클릭 시 에러 처리
  };

  const myPayInfoHandler = async () => {
    const { data } = await accessInstance.get('/team/payInfo');
    setMyPayInfo(data.payload);
    setIsPay(!isPay);
  };

  const userPayHandler = () => {
    navigate('/paymentorder');
  };

  let totalPrice;
  if (myPayInfo) {
    totalPrice = myPayInfo?.deliveryTip + myPayInfo?.price;
  }

  const statusChangeHandler = async () => {
    const { data } = await accessInstance.get('team/status');

    if (data.statusCode === 20007) {
      navigate('/order');
    }

    setTeamStatesData(data.payload.teamOrderStatus);
    setMyState(data.payload.myStatus);
  };

  return (
    <section className={classes.teamCartWrapper}>
      <h2>나의배프현황</h2>
      <ul className={classes.teamStatusList}>
        {teamStatesData.map((teamstate: TeamOrderStatus, index) => {
          return (
            <li key={index}>
              <p>{teamstate.nickname}</p>
              <span>
                현재상태 <strong>{teamstate.status}</strong>
              </span>
            </li>
          );
        })}
      </ul>
      {isPay && (
        <div className={classes.payInfo}>
          <p>나의결제정보</p>
          <div>
            <span>주문금액</span>
            <span>{myPayInfo?.price.toLocaleString()}원</span>
          </div>
          <div>
            <span>배달팁</span>
            <span>{myPayInfo?.deliveryTip.toLocaleString()}원</span>
          </div>
          <div>
            <span>총 결제금액</span>
            <span>{totalPrice?.toLocaleString()}원</span>
          </div>
          <Button onClick={userPayHandler} size="lg" active>
            결제하기
          </Button>
        </div>
      )}
      {myState === 'join' && (
        <Button onClick={teamPayHandler} size="lg">
          모집마감
        </Button>
      )}
      {myState === 'wait' && (
        <Button size="lg" active onClick={myPayInfoHandler}>
          결제금액확인
        </Button>
      )}
      {myState === 'pay' && (
        <p className={classes.payTitle}>
          아직 다른사람들이 결제중이에요.. 잠시만 기달려주세요
        </p>
      )}
      <Button size="lg" onClick={statusChangeHandler}>
        상태새로고침
      </Button>
    </section>
  );
};

export default TeamCart;
