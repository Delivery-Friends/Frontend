import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../config';
import classes from './reviewWrite.module.scss';
import ReactStars from 'react-stars';

type Review = {
  text: string;
  img: string;
  star: number;
};

const ReviewWrite = () => {
  const { state } = useLocation();
  const orderId = state;
  const [review, setReview] = useState<Review>({
    text: '',
    img: '/image/defaultImg.png',
    star: 0,
  });

  const formData = new FormData();
  const saveFileImage = (event: any) => {
    // 백엔드에 보내줄 이미지파일을 폼데이터로 저장
    formData.append('file', event.target.files[0]);

    //이미지 수정 formData 보내기
    axios
      .post(`${BASE_URL}/upload`, formData)
      .then(res => {
        if (res.status === 200) {
          console.log('이미지 첨부 성공');
          //받아온 url로 프론트상에서 이미지 변경
          setReview({
            ...review,
            img: res.data,
          });
        } else {
          throw new Error('이미지 수정 실패');
        }
      })
      .catch(error => alert(error));
  };
  console.log(review);
  return (
    <div className={classes.wrapReview}>
      <textarea
        value={review.text}
        onChange={e => {
          setReview({ ...review, text: e.target.value });
        }}
        placeholder="리뷰를 작성해 주세요..."
      ></textarea>
      <div className={classes.inputImg}>
        <img src={review.img} alt="review_img" />
        <label htmlFor="inputImg">
          <div>사진 첨부</div>
        </label>
        <input
          onChange={e => {
            saveFileImage(e);
          }}
          accept="image/*"
          type="file"
          id="inputImg"
        />
      </div>
      <ReactStars
        count={5}
        value={review.star}
        onChange={e => setReview({ ...review, star: e })}
        size={30}
        color2={'#F9BF25'}
      />

      <button>리뷰 등록</button>
    </div>
  );
};

export default ReviewWrite;
