import { useParams } from 'react-router-dom';
import StoreBody from '../../components/StoreBody/StoreBody';

const StoreDetail = () => {
  const params = useParams<string>();
  const storeId = params.id;
  return <StoreBody id={storeId} />;
};

export default StoreDetail;
