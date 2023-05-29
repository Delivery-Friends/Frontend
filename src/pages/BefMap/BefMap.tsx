import MapContainer from '../../components/Map/MapContainer';
const positions = [
  {
    title: 'BBQ',
    latlng: new kakao.maps.LatLng(33.450705, 126.570677),
  },
  {
    title: 'BBQ',
    latlng: new kakao.maps.LatLng(33.450936, 126.569477),
  },
  {
    title: 'BBQ',
    latlng: new kakao.maps.LatLng(33.450879, 126.56994),
  },
  {
    title: 'BBQ',
    latlng: new kakao.maps.LatLng(33.451393, 126.570738),
  },
];
const BefMap = () => {
  return <MapContainer />;
};

export default BefMap;
