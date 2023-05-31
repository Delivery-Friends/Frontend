import { useEffect, useRef, useState } from 'react';
import { MarkerClusterer } from 'react-kakao-maps-sdk';

import axios from 'axios';
import Marker from './Marker';
import Modal from '../common/Modal/Modal';
import { ObjectList } from '../ObjectList/ObjectList';

// export type Befs = [
//   {
//     id: number;
//     storeName: string;
//     storeStars: number;
//     storeReviews: number;
//     participants: number;
//     userName: string;
//     userStars: number;
//     userReview: number;
//     location: string;
//     deadLine: number;
//     fileNames: [
//       {
//         filename: string;
//       }
//     ];
//   }
// ];

const MapClusterer = () => {
  const [positions, setPositions] = useState([]);
  const clusterRef = useRef();
  const [befs, setBefs] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const mapData = async () => {
      const res = await axios.get('/data/positions/positions.json');
      setPositions(res.data.positions);
      return res.data.positions;
    };
    mapData();
  }, [setPositions]);

  function getTexts(count) {
    // 한 클러스터 객체가 포함하는 마커의 개수에 따라 다른 텍스트 값을 표시합니다
    if (count < 3) {
      return '2명';
    } else if (count < 4) {
      return '3명';
    } else if (count < 5) {
      return '4명';
    } else if (count < 6) {
      return '5명';
    } else if (count < 7) {
      return '6명';
    } else if (count < 8) {
      return '7명';
    } else if (count < 9) {
      return '8명';
    } else if (count < 10) {
      return '9명';
    } else {
      return 'Many';
    }
  }

  useEffect(() => {
    axios.get('/data/objectList/befs.json').then(res => setBefs(res.data));
  }, []);

  const clusterClickHandler = () => {
    console.log(clusterRef.current.markers);
    setModalOpen(!modalOpen);
  };

  const onClustered = (e, clusters) => {
    console.log(clusters.markers);
  };

  return (
    <>
      <MarkerClusterer
        disableClickZoom={true}
        onClusterclick={clusterClickHandler}
        ref={clusterRef}
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={2} // 클러스터 할 최소 지도 레벨
        calculator={[3, 4, 5, 6, 7, 8, 9, 10]}
        texts={getTexts}
        onClustered={onClustered}
        styles={[
          {
            width: '32px',
            height: '32px',
            background: '#5f4ef7',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '30px',
          },
        ]}
      >
        {positions &&
          positions.map(pos => (
            <Marker
              key={`${pos.lat}-${pos.lng}`}
              center={{
                lat: pos.lat,
                lng: pos.lng,
              }}
            />
          ))}
      </MarkerClusterer>
      <Modal
        isOpen={modalOpen}
        title="베프 리스트"
        onClose={() => {
          setModalOpen(!modalOpen);
        }}
        body={<ObjectList stores={undefined} befs={befs} />}
      />
    </>
  );
};

export default MapClusterer;
