import { useNavigate, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { accessInstance } from '../../api/axiosBase';
import classes from './userDetail.module.scss';
import { useEffect, useState } from 'react';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko'; // 한글로 변환
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
// import Button from '../../components/common/Button/Button';
// import { BiPencil } from 'react-icons/bi';

register('ko', koLocale);

interface UserData {
  nickname: string;
  imgSrc: string;
  score: number;
  reviewCount: number;
  isLike: boolean;
  likeCount: number;
}

interface UserReviewData {
  nickname: string;
  userId: number;
  imgSrc: string;
  content: string;
  score: number;
  createdDate: string;
}

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>();
  const [userReviews, setUserReviews] = useState<UserReviewData[]>([]);
  const [isLike, setIsLike] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<number>();

  useEffect(() => {
    const api = async () => {
      const { data: userInfo } = await accessInstance.get(`/userinfo/${id}`);
      setUserData(userInfo.payload);
      setIsLike(userInfo.payload.isLike);
      setLikeCount(userInfo.payload.likeCount);
      const { data: userReview } = await accessInstance.get(
        `/user/review/${id}`
      );
      setUserReviews(userReview.payload);
    };
    api();
  }, [id]);

  // 리뷰를 한번만 작성하는 게 가능하기 때문에 기능 없애기
  // const reviewWriteHandler = () => {
  //   navigate('/reviewWrite', {
  //     state: { orderId: undefined, leaderId: id },
  //   });
  // };

  const goUserDetailPage = (userId: number) => {
    navigate(`/userDetail/${userId}`);
  };

  const beflikeHandler = async () => {
    if (localStorage.getItem('refreshToken')) {
      if (!isLike) {
        await accessInstance.post(`/user/like/${id}`);
        setIsLike(!isLike);
        setLikeCount(prevLike => (prevLike as number) + 1);
      } else {
        await accessInstance.post(`/user/dislike/${id}`);
        setIsLike(!isLike);
        setLikeCount(prevLike => (prevLike as number) - 1);
      }
    }
  };
  return (
    <section className={classes.userInfoWrapper}>
      <div className={classes.userInfo}>
        <div className={classes.mainUserImg}>
          <img src={userData?.imgSrc} alt="프로필이미지" />
        </div>
        <div className={classes.userInfoText}>
          <div className={classes.nickName}>
            <p>{userData?.nickname}</p>
          </div>
          <div className={classes.starReview}>
            <AiFillStar className={classes.star} />
            <strong>{userData?.score.toString().substring(0, 3)}</strong>
            <span onClick={beflikeHandler}>
              {isLike ? (
                <BsFillHeartFill className={classes.heart} color="red" />
              ) : (
                <BsHeart className={classes.heart} />
              )}
            </span>
            <strong>{likeCount}</strong>
          </div>
        </div>
        {/* <div className={classes.rightButton}>
          <Button size="sm" active onClick={reviewWriteHandler}>
            <BiPencil />
            리뷰작성하기
          </Button>
        </div> */}
      </div>
      <div className={classes.userReview}>
        <div className={classes.reviewTitle}>
          <div className={classes.reviewTotal}>
            <p>최근리뷰</p>
            <span>{userData?.reviewCount}개</span>
          </div>
        </div>
        <ul className={classes.reviewList}>
          {userReviews.length > 0 &&
            userReviews.map((review, index) => {
              return (
                <li key={index}>
                  <div className={classes.reviewUserInfo}>
                    <img
                      src={review.imgSrc}
                      alt="프로필이미지"
                      onClick={() => goUserDetailPage(review.userId)}
                    />
                    <div>
                      <div>{review.nickname}</div>
                      <div className={classes.starReview}>
                        <AiFillStar className={classes.star} />
                        <strong>{review.score}</strong>
                        <p>{format(review.createdDate, 'ko')}</p>
                      </div>
                    </div>
                  </div>
                  <div className={classes.content}>{review.content}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default UserDetail;
