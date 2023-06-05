import { useEffect, useState } from 'react';

import { createNewMark } from './marker';
import Location from './Location';

import { FadeLoader } from 'react-spinners';
import classes from './map.module.scss';
import { instance } from '../../api/axiosBase';
import { ObjectList } from '../ObjectList/ObjectList';
import axios from 'axios';
import Modal from '../common/Modal/Modal';

const { kakao } = window;
const BefStoreMap = ({ positions }) => {
  const location = Location();
  const [mapInstance, setMapInstance] = useState(null);
  const [befs, setBefs] = useState(positions);
  const [markers, setMarkers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!location.isLoading && !mapInstance) {
      const container = document.getElementById('befstoremap');
      const options = {
        center: new kakao.maps.LatLng(location.center.lat, location.center.lng),
        level: 2,
      };
      const map = new kakao.maps.Map(container, options);

      kakao.maps.event.addListener(map, 'idle', () => {
        let timer;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(async () => {
          const bounds = map.getBounds();
          const { data } = await instance.get('/teamlistMap', {
            params: {
              lessLatitude: bounds.qa.toString(),
              greaterLatitude: bounds.pa.toString(),
              lessLongitude: bounds.ha.toString(),
              greaterLongitude: bounds.oa.toString(),
            },
          });
          console.log(data.payload);
          setBefs(data.payload);

          // await axios
          //   .get('/data/objectList/befs.json')
          //   .then(res => setBefs(res.data));
        }, 2500);
      });

      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4,
        minClusterSize: 1,
        disableClickZoom: true,
        styles: [
          {
            width: '32px',
            height: '32px',
            background: '#7263f8',
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '30px',
          },
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
        ],
      });
      setMapInstance({ map, clusterer });
    }
  }, [mapInstance, location]);

  useEffect(() => {
    if (!location.isLoading && mapInstance && befs) {
      const { map, clusterer } = mapInstance;
      clusterer.clear();
      const markers = createNewMark(map, befs);
      console.log(markers);
      clusterer.addMarkers(markers);
      console.log(clusterer);
      kakao.maps.event.addListener(
        clusterer,
        'clusterclick',
        function (cluster) {
          const markers = cluster.getMarkers();
          const clustermarkers = [];
          markers.forEach(marker => {
            clustermarkers.push(marker);
          });
          setMarkers(clustermarkers);
          setModalOpen(!modalOpen);
        }
      );

      clusterer.setCalculator([2]);
    }
  }, [mapInstance, befs, location, modalOpen]);
  return (
    <>
      {location.isLoading ? (
        <div className={classes.spinner}>
          <FadeLoader color="#5f4ef7" />
        </div>
      ) : (
        <div
          style={{
            // 지도의 크기
            width: '100%',
            height: '682px',
          }}
          id="befstoremap"
        />
      )}
      <Modal
        isOpen={modalOpen}
        title="베프 리스트"
        onClose={() => {
          setModalOpen(!modalOpen);
        }}
        body={markers && <ObjectList stores={undefined} befs={markers} />}
      />
    </>
  );
};

export default BefStoreMap;
