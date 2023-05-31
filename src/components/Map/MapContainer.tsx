import { Map } from 'react-kakao-maps-sdk';
import Marker from './Marker';
import Location from './Location';
import { useRef, useState } from 'react';
import classes from './map.module.scss';
import { FadeLoader } from 'react-spinners';
import Button from '../common/Button/Button';
import MapClusterer from './MapClusterer';

type MapContainerProps = {
  positions: {
    title: string;
    latlng: {
      lat: number;
      lng: number;
    };
  }[];
};

const MapContainer = ({ positions }: MapContainerProps) => {
  const location: any = Location();
  const mapRef = useRef<any>();
  const [mapInfo, setMapInfo] = useState<any>();

  const mapInfoHandler = () => {
    const map = mapRef.current;
    setMapInfo({
      center: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
      level: map.getLevel(),
      typeId: map.getMapTypeId(),
      swLatLng: {
        lat: map.getBounds().getSouthWest().getLat(),
        lng: map.getBounds().getSouthWest().getLng(),
      },
      neLatLng: {
        lat: map.getBounds().getNorthEast().getLat(),
        lng: map.getBounds().getNorthEast().getLng(),
      },
    });
  };

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
          height: '682px',
        }}
        level={4}
        // 지도의 확대 레벨
        ref={mapRef}
      >
        <Marker center={location.center} />
        {positions.map(pos => {
          return (
            <Marker
              key={`${pos.latlng.lat}-${pos.latlng.lng}`}
              center={pos.latlng}
              title={pos.title}
            />
          );
        })}
        <MapClusterer />
      </Map>
      <Button onClick={mapInfoHandler}>베프정보 맵 가져오기</Button>
    </div>
  );
};

export default MapContainer;
