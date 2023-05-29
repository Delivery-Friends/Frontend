import { Map } from 'react-kakao-maps-sdk';
import Marker from './Marker';
import Location from './Location';
import { useRef } from 'react';
import classes from './map.module.scss';
import { FadeLoader } from 'react-spinners';

type MapContainerProps = {
  title: string;
  latlng: {
    lat: string;
    lng: string;
  };
}[];

const MapContainer = () => {
  const location: any = Location();
  const mapRef = useRef<any>();

  if (location.isLoading) {
    return (
      <div className={classes.spinner}>
        <FadeLoader color="#5f4ef7" />
      </div>
    );
  }

  return (
    <div className={classes.mapcontainer}>
      <Map
        center={
          // 지도의 중심좌표
          location.center
        }
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3}
        // 지도의 확대 레벨
        ref={mapRef}
      >
        <Marker center={location.center} />
      </Map>
    </div>
  );
};

export default MapContainer;
