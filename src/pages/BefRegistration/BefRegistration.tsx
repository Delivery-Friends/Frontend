import React, { useState } from 'react';
import classes from './befRegistration.module.scss';
import { AiFillStar } from 'react-icons/ai';
import PopupPostCode from './SearchAddress/PopupPostCode';

const BefRegistration = () => {
  const [range, setRange] = useState(1);
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 주소 값 관리
  const [fullAddress, setFullAddress] = useState('');
  const [zoneCode, setZoneCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  // 위도 경도 값 관리
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const handleAddress = (fullAddr: string, zipCode: string) => {
    // let geocoder = new kakao.maps.services.Geocoder();
    // let callback = function (result: any, status: any) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     setLat(result[0].x);
    //     setLong(result[0].y);
    //   }
    // };

    // geocoder.addressSearch(fullAddr, callback);
    setFullAddress(fullAddr);
    setZoneCode(zipCode);
  };

  return (
    <div className={classes.wrapBefRegistration}>
      <div className={classes.storeInfo}>
        <div className={classes.objectLeft}>
          <img src={'/image/brandLogo/bbqLogo.png'} alt="brandLogo" />
        </div>
        <div className={classes.objectRight}>
          <div className={classes.objectTitle}>가계이름</div>
          <div className={classes.score}>
            <AiFillStar className={classes.star} />
            <span>
              {3.9}
              <span className={classes.review}>(+100)</span>
            </span>
          </div>
          <div className={classes.objectMid}>
            배달 {30}분 | 배달팀 {3000}원
          </div>
          <div className={classes.objectBottom}>최소주문 {12000}원</div>
        </div>
      </div>
      <div className={classes.range}>
        <span className={classes.title}>모집 인원 설정</span>
        <span>{range}명</span>
        <input
          type="range"
          min={0}
          max={10}
          color={'#fff'}
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
        <div>
          <input
            placeholder="우편번호"
            onChange={e => setZoneCode(e.target.value)}
            value={zoneCode}
            disabled
          />
          <button onClick={() => setIsPopupOpen(true)}>검색</button>
          {isPopupOpen && (
            <PopupPostCode
              closePopup={() => setIsPopupOpen(false)}
              handleAddress={handleAddress}
            />
          )}
          <input
            placeholder="기본주소"
            value={fullAddress}
            onChange={e => setFullAddress(e.target.value)}
            disabled
          />

          <input
            placeholder="상세주소"
            value={detailAddress}
            onChange={e => setDetailAddress(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.deadline}>
        <span className={classes.title}>모짐 마감 시간</span>
      </div>
    </div>
  );
};

export default BefRegistration;
