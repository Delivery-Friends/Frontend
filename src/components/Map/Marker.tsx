import { MapMarker } from 'react-kakao-maps-sdk';

interface MarkerProps {
  center: { lat: number; lng: number };
}
const Marker = ({ center }: MarkerProps) => {
  return (
    <MapMarker // 마커를 생성합니다
      position={center}
      image={{
        src: 'https://d32gkk464bsqbe.cloudfront.net/assets/img/general/icon-address.png?v=6.8.7', // 마커이미지의 주소입니다
        size: {
          width: 50,
          height: 50,
        }, // 마커이미지의 크기입니다
        options: {
          offset: {
            x: 20,
            y: 40,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
    />
  );
};

export default Marker;
