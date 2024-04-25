import React, { useEffect, useState } from 'react';
import classes from './reviews.module.scss';
import ReactStars from 'react-stars';
import { instance } from '../../api/axiosBase';

type ReviewType =
  | {
      nickname: string;
      imgSrc: string;
      score: number;
      content: string;
      createdAt: string;
      reviewMedium: string[];
    }[]
  | undefined;

const Reviews = (props: { id: number | undefined | string }) => {
  const { id } = props;
  const [review, setReview] = useState<ReviewType>();
  useEffect(() => {
    instance
      .get(`/store/review/${id}`)
      .then(res => setReview(res.data.payload));
  }, [id]);
  return (
    <div>
      {review && (
        <div className={classes.reviews}>
          <div className={classes.header}>
            <div>
              최근리뷰
              <span className={classes.reviewCount}>{review?.length}개</span>
            </div>
            <select>
              <option value="1">최신순</option>
              <option value="2">별점 높은 순</option>
              <option value="3">별점 낮은 순</option>
            </select>
          </div>
          <div className={classes.reviewList}>
            {review &&
              review.map((obj: any, index: number) => {
                return (
                  <div key={index} className={classes.review}>
                    <div className={classes.top}>
                      <img src={obj.imgSrc} alt="profile_img" />
                      <div className={classes.topRight}>
                        <div className={classes.userName}>{obj.nickname}</div>
                        <div className={classes.star}>
                          <ReactStars
                            count={5}
                            value={obj.score}
                            size={12}
                            color2="#F9BF25"
                            edit={false}
                          />
                          <span className={classes.date}>
                            {obj.createdAt.substring(0, 10)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={classes.content}>
                      {obj.reviewMedium[0] !== '' && (
                        <img src={obj.reviewMedium[0]} alt="review_img" />
                      )}
                      <div className={classes.text}>{obj.content}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
