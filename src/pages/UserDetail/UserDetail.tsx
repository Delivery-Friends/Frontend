import { useNavigate, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { accessInstance } from '../../api/axiosBase';
import classes from './userDetail.module.scss';
import { useEffect, useState } from 'react';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko'; // 한글로 변환
import Button from '../../components/common/Button/Button';
import { BsHeart, BsFillHeartFill } from 'react-icons/bs';
import { BiPencil } from 'react-icons/bi';

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
      const { data } = await accessInstance.get(`/userinfo/${id}`);
      setUserData(data.payload);
      setIsLike(data.payload.isLike);
      setLikeCount(data.payload.likeCount);
    };
    api();
  }, [id]);

  useEffect(() => {
    const api = async () => {
      const { data } = await accessInstance.get(`/user/review/${id}`);
      setUserReviews(data.payload);
    };
    api();
  }, [id]);
  const reviewWriteHandler = () => {
    navigate('/reviewWrite', {
      state: { orderId: undefined, leaderId: id },
    });
  };

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

  const imageDefaultHandler = (e: any) => {
    e.target.onerror = null;
    e.target.src = '/image/userImage/placeholder.jpg';
  };

  return (
    <section className={classes.userInfoWrapper}>
      <div className={classes.userInfo}>
        <div className={classes.mainUserImg}>
          <img
            src={userData?.imgSrc}
            alt="프로필이미지"
            onError={imageDefaultHandler}
          />
        </div>
        <div className={classes.userInfoText}>
          <div className={classes.nickName}>
            <p>{userData?.nickname}</p>
          </div>
          <div className={classes.starReview}>
            <AiFillStar className={classes.star} />
            <strong>{userData?.score}</strong>
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
        <div className={classes.rightButton}>
          <Button size="sm" active onClick={reviewWriteHandler}>
            <BiPencil />
            리뷰작성하기
          </Button>
        </div>
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
                      onError={imageDefaultHandler}
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
