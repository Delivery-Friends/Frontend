import React from 'react';
import classes from './reviews.module.scss';
import ReactStars from 'react-stars';

const Reviews = () => {
  return (
    <div className={classes.reviews}>
      <div className={classes.header}>
        <div>
          최근리뷰<span className={classes.reviewCount}>123개</span>
        </div>
        <select>
          <option value="1">최신순</option>
          <option value="2">별점 높은 순</option>
          <option value="3">별점 낮은 순</option>
        </select>
      </div>
      <div className={classes.reviewList}>
        <div className={classes.review}>
          <div className={classes.top}>
            <img src="/image/brandLogo/bbqLogo.png" alt="profile_img" />
            <div className={classes.topRight}>
              <div className={classes.userName}>유저이름</div>
              <div className={classes.star}>
                <ReactStars
                  count={5}
                  value={4.9}
                  size={12}
                  color2={'#F9BF25'}
                />
                <span className={classes.date}>리뷰작성날짜</span>
              </div>
            </div>
          </div>
          <div className={classes.content}>
            <img src="/image/brandLogo/bbqLogo.png" alt="review_img" />
            <div className={classes.text}>리뷰내용</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
