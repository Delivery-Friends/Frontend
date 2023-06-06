import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './reviewWrite.module.scss';
import ReactStars from 'react-stars';
import { accessInstance } from '../../api/axiosBase';
import axios from 'axios';
import { BASE_URL } from '../../config';

type Review = {
  text: string;
  img: string;
  star: number;
};

const ReviewWrite = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state;
  const [review, setReview] = useState<Review>({
    text: '',
    img: '',
    star: 0,
  });

  const formData = new FormData();
  const saveFileImage = (event: any) => {
    // 백엔드에 보내줄 이미지파일을 폼데이터로 저장
    formData.append('file', event.target.files[0]);

    //이미지 업로드 formData 보내기
    axios
      .post(`${BASE_URL}/upload`, formData)
      .then(res => {
        if (res.status === 200) {
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

  const onReviewAdd = () => {
    if (id.orderId !== undefined) {
      // 상점리뷰일때
      accessInstance
        .post('/user/review/store/add', {
          orderId: id.orderId,
          score: review.star,
          content: review.text,
          media: [review.img],
        })
        .then(res => {
          if (res.status === 200) {
            navigate('/order');
          } else {
            alert('리뷰 등록에 실패하였습니다.');
          }
        });
    } else {
      //배프리더에 대한 리뷰일때
      accessInstance
        .post('/user/review', {
          userId: id.leaderId,
          content: review.text,
          score: review.star,
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            // navigate(`/userDetail/${id.leaderId}`);
          } else {
            alert('리뷰 등록에 실패하였습니다.');
          }
        });
    }
  };

  return (
    <div className={classes.wrapReview}>
      <textarea
        value={review.text}
        onChange={e => {
          setReview({ ...review, text: e.target.value });
        }}
        placeholder="리뷰를 작성해 주세요..."
      />
      <div
        className={classes.inputImg}
        style={
          id.orderId !== undefined ? { display: 'block' } : { display: 'none' }
        }
      >
        {review.img === '' ? (
          <img src="/image/defaultImg.png" alt="review_img" />
        ) : (
          <img src={review.img} alt="review_img" />
        )}
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
        color2="#F9BF25"
      />

      <button onClick={() => onReviewAdd()}>리뷰 등록</button>
    </div>
  );
};

export default ReviewWrite;
