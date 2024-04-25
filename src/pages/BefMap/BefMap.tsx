import { useEffect, useState } from 'react';
import axios from 'axios';

import BefStoreMap from '../../components/Map/BefStoreMap';

const BefMap = () => {
  const [befs, setBefs] = useState([]);

  useEffect(() => {
    axios.get('/data/objectList/befs.json').then(res => setBefs(res.data));
  }, []);

  return <BefStoreMap positions={befs} />;
};

export default BefMap;
