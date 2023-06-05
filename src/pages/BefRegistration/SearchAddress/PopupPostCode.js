import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = ({ closePopup, handleAddress }) => {
  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';
    let zipCode = data.zonecode;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }
    handleAddress(fullAddr, zipCode);
  };

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '300px',
    height: '400px',
    border: '1px solid lightgray',
    margin: `5px 0px 0px 0px`,
  };

  return (
    <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
  );
};

export default PopupPostCode;
