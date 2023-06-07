import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { accessInstance, imgInstance } from '../../api/axiosBase';
import classes from './mypage.module.scss';
import { useEffect, useRef, useState } from 'react';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko'; // 한글로 변환
import Button from '../../components/common/Button/Button';
import IconImgButton from '../../assets/images/icon-img-button-gray.svg';

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

const MyPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>();
  const [userReviews, setUserReviews] = useState<UserReviewData[]>([]);
  const [isChangeNickName, setIsChangeNickName] = useState(false);
  const [isChangeImg, setIsChangeImg] = useState(false);
  const [userNickName, setUserNickName] = useState<string>();
  const [preImage, setPreImage] = useState(undefined);

  const nickNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const api = async () => {
      const { data } = await accessInstance.get(`/user/my`);
      setUserData(data.payload);
    };
    api();
  }, []);

  useEffect(() => {
    const api = async () => {
      const { data } = await accessInstance.get(`/user/myReview/`);
      setUserReviews(data.payload);
    };
    api();
  }, []);

  const goLikeListPage = () => {
    navigate('/likedStore');
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate('/');
  };

  const goUserDetailPage = (userId: number) => {
    navigate(`/userDetail/${userId}`);
  };

  const nickNameChangeHandler = () => {
    setIsChangeNickName(!isChangeNickName);

    if (isChangeNickName) {
      const changeNickName = async () => {
        const nickname = nickNameRef.current?.value;
        const { data } = await accessInstance.post('/user/nickname', {
          content: nickname,
        });
        if (data.message === '닉네임을 입력해주세요.') {
          alert(data.message);
          return;
        } else if (data.message === '닉네임 길이는 2자 이상입니다.') {
          alert(data.message);
          return;
        } else if (data.message === '닉네임 길이는 9자 이하입니다.') {
          alert(data.message);
          return;
        } else if (data.message === '허용되지 않은 문자가 있습니다.') {
          alert(data.message);
          return;
        } else if (data.message === '중복된 닉네임이 존재합니다.') {
          alert(data.message);
          return;
        } else {
          setUserNickName(nickname);
        }
      };
      changeNickName();
    }
  };

  const imgChangeHandler = () => {
    setIsChangeImg(prevIsChangeImg => !prevIsChangeImg);

    if (isChangeImg && preImage) {
      const changeImg = async () => {
        await accessInstance.post('/user/profile', {
          content: preImage,
        });
      };
      changeImg();
    } else {
      return;
    }
  };

  const uploadChangeImgHandler = (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const imgUpload = async () => {
      try {
        const res = await imgInstance.post('/upload', formData);
        if (res.status === 200) {
          setPreImage(res.data);
        } else {
          setPreImage(undefined);
          throw new Error('이미지 수정 실패');
        }
      } catch (error: any) {
        alert(error.message);
      }
    };
    imgUpload();
  };

  return (
    <section className={classes.userInfoWrapper}>
      <div className={classes.userInfo}>
        <div className={classes.mainUserImg}>
          {isChangeImg ? (
            <>
              <img src={preImage || userData?.imgSrc} alt="미리보기이미지" />
              <label
                htmlFor="imgupload"
                style={{ background: `url(${IconImgButton})` }}
              />
              <input
                className="ir"
                id="imgupload"
                accept="image/*"
                type="file"
                onChange={uploadChangeImgHandler}
              />
            </>
          ) : (
            <img src={preImage || userData?.imgSrc} alt="프로필이미지" />
          )}
          <Button size="xs" onClick={imgChangeHandler}>
            {isChangeImg ? '수정완료' : '수정하기'}
          </Button>
        </div>
        <div className={classes.userInfoText}>
          <div className={classes.nickName}>
            {isChangeNickName ? (
              <input
                type="text"
                ref={nickNameRef}
                placeholder={userNickName || userData?.nickname}
              />
            ) : (
              <p>{userNickName || userData?.nickname}</p>
            )}
            <Button size="xs" onClick={nickNameChangeHandler}>
              {isChangeNickName ? '수정완료' : '수정하기'}
            </Button>
          </div>
          <div className={classes.starReview}>
            <AiFillStar className={classes.star} />
            <strong>{userData?.score.toString().substring(0, 3)}</strong>
          </div>
        </div>
        <div className={classes.rightButton}>
          <Button size="sm" active onClick={goLikeListPage}>
            찜 목록
          </Button>
          <Button size="sm" onClick={logoutHandler}>
            로그아웃
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
          {userReviews &&
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

export default MyPage;
