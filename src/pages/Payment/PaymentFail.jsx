import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import clasess from './payment.module.scss';
const PaymentFail = () => {
  const navigate = useNavigate();
  const moveHomePageHandler = () => {
    navigate('/');
  };

  return (
    <div className={clasess.failwrapper}>
      <h2>결제에 실패했습니다.</h2>
      <Button size="lg" onClick={moveHomePageHandler}>
        장바구니로 다시이동하기
      </Button>
    </div>
  );
};

export default PaymentFail;
