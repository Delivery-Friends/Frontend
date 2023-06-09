import { useEffect, useState } from 'react';

const Location = () => {
  const [location, setLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: '',
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 현재 사용자 위치 설정
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation(prev => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        err => {
          setLocation(prev => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setLocation(prev => ({
        ...prev,
        errMsg: '위치정보를 가져올 수 없습니다.',
        isLoading: false,
      }));
    }
  }, []);

  return location;
};

export default Location;
