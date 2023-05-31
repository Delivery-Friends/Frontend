import MapContainer from '../../components/Map/MapContainer';
const positions = [
  {
    title: 'BBQ',
    latlng: { lat: 37.67028196352, lng: 126.80707128241 },
  },
  {
    title: 'BBQ',
    latlng: { lat: 37.632345, lng: 126.34707128221312 },
  },
  {
    title: 'BBQ',
    latlng: { lat: 37.650281963528055, lng: 126.7070712823131 },
  },
  {
    title: 'BBQ',
    latlng: { lat: 37.520281963526755, lng: 126.81607128243431591 },
  },
];

const BefMap = () => {
  return <MapContainer positions={positions} />;
};

export default BefMap;
