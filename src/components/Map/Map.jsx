import { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const { kakao } = window;
    let map = new kakao.maps.Map(document.getElementById('map'), {
      // 지도를 표시할 div
      center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
      level: 14, // 지도의 확대 레벨
    });
  }, []);

  return <div>map</div>;
};

export default Map;
