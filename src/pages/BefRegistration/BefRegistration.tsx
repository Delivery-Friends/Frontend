import React, { useState } from 'react';
import classes from './befRegistration.module.scss';
import { AiFillStar } from 'react-icons/ai';
import PopupPostCode from './SearchAddress/PopupPostCode';
import moment from 'moment';
import { accessInstance } from '../../api/axiosBase';
import { useLocation, useNavigate } from 'react-router-dom';

const BefRegistration = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const store = state;
  const [range, setRange] = useState(1);
  // const [ampm, setAmpm] = useState<string>('오전');
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const date = moment().format();
  const time = date.substring(0, 11) + hour + ':' + minute + ':00';

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 주소 값 관리
  const [fullAddress, setFullAddress] = useState('');
  // const [zoneCode, setZoneCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  // 위도 경도 값 관리
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const handleAddress = (fullAddr: string, zipCode: string) => {
    let geocoder = new kakao.maps.services.Geocoder();
    let callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        setLat(result[0].y);
        setLong(result[0].x);
      } else {
        alert('주소변환 실패');
      }
    };

    geocoder.addressSearch(fullAddr, callback);
    setFullAddress(fullAddr);
    // setZoneCode(zipCode);
  };

  const onReg = () => {
    accessInstance
      .post('/team/make', {
        endTime: time,
        storeId: store.id,
        maxMember: range,
        basicAddress: fullAddress,
        detailedAddress: detailAddress,
        latitude: lat,
        logitude: long,
      })
      .then(res => {
        if (res.data.statusCode === 200) {
          navigate('/befList');
        } else if (res.data.message === '이미 가입한 팀이 있습니다.') {
          alert('이미 가입한 팀이 있습니다.');
        } else {
          alert('배프등록에 실패하였습니다.');
        }
      });
  };

  return (
    <div className={classes.wrapBefRegistration}>
      <div className={classes.storeInfo}>
        <div className={classes.objectLeft}>
          {/* <img src={store?.medium[0]} alt="brandLogo" /> */}
          <img src={store?.medium[0]} alt="brandLogo" />
        </div>
        <div className={classes.objectRight}>
          <div className={classes.objectTitle}>{store?.name}</div>
          <div className={classes.score}>
            <AiFillStar className={classes.star} />
            <span>
              {store?.reviewScore.toString().substring(0, 3)}
              <span className={classes.review}>(+{store?.reviewCount})</span>
            </span>
          </div>
          <div className={classes.objectMid}>
            배달 {store?.deliveryWaitTime}분 | 배달팁{' '}
            {store?.deliveryTip.toLocaleString()}원
          </div>
          <div className={classes.objectBottom}>
            최소주문 {store?.minPrice.toLocaleString()}원
          </div>
        </div>
      </div>
      <div className={classes.range}>
        <span className={classes.title}>모집 인원 설정</span>
        <span>{range}명</span>
        <input
          type="range"
          min={0}
          max={10}
          color="#fff"
          step={1}
          value={range}
          onChange={e => {
            setRange(e.target.valueAsNumber);
          }}
        />
        <div className={classes.zero}>0</div>
        <div className={classes.ten}>10</div>
      </div>
      <div className={classes.address}>
        <span className={classes.title}>주소</span>
        <div className={classes.inputWrapper}>
          {isPopupOpen && (
            <PopupPostCode
              closePopup={() => setIsPopupOpen(false)}
              handleAddress={handleAddress}
            />
          )}
          <input
            className={classes.inputAddress}
            placeholder="기본주소"
            value={fullAddress}
            onChange={e => setFullAddress(e.target.value)}
            disabled
          />

          <button onClick={() => setIsPopupOpen(true)}>검색</button>
          <input
            className={classes.inputAddress}
            placeholder="상세주소"
            value={detailAddress}
            onChange={e => setDetailAddress(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.deadline}>
        <span className={classes.title}>모짐 마감 시간</span>
        <div className={classes.time}>
          {/* <select value={ampm} onChange={e => setAmpm(e.target.value)}>
            <option value="오전">오전</option>
            <option value="오후">오후</option>
          </select> */}
          <select value={hour} onChange={e => setHour(e.target.value)}>
            {hours.map((str, index) => {
              return (
                <option value={str} key={index}>
                  {str}시
                </option>
              );
            })}
          </select>
          <select value={minute} onChange={e => setMinute(e.target.value)}>
            {minutes.map((str, index) => {
              return (
                <option value={str} key={index}>
                  {str}분
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={classes.wrapBtn}>
        <button onClick={() => onReg()}>배프 등록하기</button>
      </div>
    </div>
  );
};

export default BefRegistration;

const hours = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
const minutes = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];
