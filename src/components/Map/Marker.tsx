import { MapMarker } from 'react-kakao-maps-sdk';

interface MarkerProps {
  center: { lat: number; lng: number };
  title?: string;
}

// const foodImage = {
//   양식: '/image/food/양식.png',
//   분식: '/image/food/분식.png',
//   한식: '/image/food/한식.png',
//   중식: '/image/food/중식.png',
//   치킨: '/image/food/치킨.png',
//   피자: '/image/food/피자.png',
//   일식: '/image/food/일식_1.png',
// };

// 마커 기본 이미지
// https://d32gkk464bsqbe.cloudfront.net/assets/img/general/icon-address.png?v=6.8.7

const Marker = ({ center, title }: MarkerProps) => {
  return (
    <MapMarker // 마커를 생성합니다
      position={center}
      image={{
        src: 'https://d32gkk464bsqbe.cloudfront.net/assets/img/general/icon-address.png?v=6.8.7',
        size: {
          width: 32,
          height: 32,
        }, // 마커이미지의 크기입니다
        options: {
          offset: {
            x: 20,
            y: 40,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
      title={title}
    />
  );
};

export default Marker;
