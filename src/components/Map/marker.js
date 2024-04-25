const { kakao } = window;

const categoryImage = {
  분식: 'snack',
  일식: 'japan',
  한식: 'korea',
  중식: 'china',
  양식: 'west',
  치킨: 'chicken',
  피자: 'pizza',
};

// {
//   "groupEndTime": "2023-06-04T16:51:32.108Z",
//   "teamId": 1,
//   "storeId": 1,
//   "storeName": "피자헛",
//   "leaderName": "이정호",
//   "leaderImgSrc": ["string"],
//   "category": "피자",
//   "storeImgUrl": ["string"],
//   "storeScore": 4,
//   "reviewCount": 999,
//   "deliveryTime": 14,
//   "deliveryTip": 15,
//   "minPrice": 11,
//   "maxMember": 10,
//   "basicAddress": "경기도 고양시 일산동구 은행마을로 100",
//   "detailedAddress": "05동 503호",
//   "latitude": "37.27943074139098",
//   "longitude": "127.01763998406159"
// },

export const createNewMark = (map, storeData) => {
  const markers = storeData.map(markerdata => {
    const {
      groupEndTime,
      teamId,
      storeId,
      category,
      storeName,
      leaderName,
      storeScore,
      reviewCount,
      deliveryTime,
      leaderImgSrc,
      storeImgUrl,
      deliveryTip,
      minPrice,
      maxMember,
      basicAddress,
      detailedAddress,
      latitude,
      longitude,
    } = markerdata;
    const icon = new kakao.maps.MarkerImage(
      `/image/food/${categoryImage[category]}.png`,
      // `/image/food/korea.png`,
      new kakao.maps.Size(36, 36),
      {
        alt: '마커이미지',
      }
    );

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(+latitude, +longitude),
      title: storeName,
      image: icon,
      clickable: true,
    });

    const content = '<div style="padding:10px;">마커 클릭 시</div>';

    let infowindow = new kakao.maps.InfoWindow({
      content: content,
      removable: true,
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });

    marker.groupEndTime = groupEndTime;
    marker.storeId = storeId;
    marker.teamId = teamId;
    marker.leaderName = leaderName;
    marker.storeName = storeName;
    marker.storeScore = storeScore;
    marker.reviewCount = reviewCount;
    marker.deliveryTime = deliveryTime;
    marker.deliveryTip = deliveryTip;
    marker.minPrice = minPrice;
    marker.maxMember = maxMember;
    marker.address = basicAddress + detailedAddress;
    marker.leaderImgSrc = leaderImgSrc;
    marker.storeImgUrl = storeImgUrl;
    return marker;
  });

  return markers;
};
