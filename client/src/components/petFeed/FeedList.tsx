import React, { createRef, useRef, useState } from "react";
import { feedListsType } from "../../types/feedDataType";
import FeedDetail from "./FeedDetail";
import {
  Feed,
  FeedHeader,
  Profile,
  ProfileBox,
  ProfileImg,
  Unknown,
  UserName,
  FeedAddress,
  PinPoint,
  UploadTime,
  FeedContents,
  FeedTitle,
  FeedContent,
  FeedMedia,
  FeedImgs,
  FeedImg,
  LeftScroll,
  RightScroll,
  FeedStatus,
  LikeBox,
  FeedBottom,
  ReviewCount,
  Setting,
  SettingBox,
  FeedVideo,
} from "./Feed.Style";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
import Dropdown from "../../atoms/dropdown/Dropdowns";
import { useDeleteFeed } from "../../hooks/FeedHook";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reportAtom, tokenAtom } from "../../atoms";

interface OwnProps {
  items: feedListsType;
}

const FeedList: React.FC<OwnProps> = ({ items }) => {
  const accesstoken = useRecoilValue(tokenAtom);

  const [isDetail, setDetail] = useState<boolean>(false);
  const [isLike, setLike] = useState<boolean>(false);
  const [isBookmark, setBookmark] = useState<boolean>(false);
  const [isSetting, setSetting] = useState<boolean>(false);
  const today = new Date();
  const createDate = items.createdDate.split("T")[0];
  const feedDate = createDate.split("-").map((el) => parseInt(el));
  const createTime = items.createdDate.split("T")[1];
  const feedTime = createTime.split(":").map((el) => parseInt(el));

  const handleMoreReview = (): void => setDetail(!isDetail);
  const handleLike = (): void => setLike(!isLike);
  const handleBookmark = (): void => setBookmark(!isBookmark);
  const handleSetting = (): void => setSetting(!isSetting);
  const handleCloseDropdown = () => setSetting(false);

  const mediaRef = useRef<any>(null);
  const imgRef = useRef<any>(items.images?.map(() => createRef()));
  const [isMedia, setMedia] = useState<number>(0);

  // 미디어 오른쪽 스크롤 이동 버튼
  const handleScrollRight = () => {
    if (isMedia >= 0 && imgRef.current[isMedia + 1]) {
      mediaRef.current.scrollLeft =
        mediaRef.current.scrollLeft +
        imgRef.current[isMedia].current.offsetWidth +
        20;
      setMedia(isMedia + 1);
    }
  };

  // 미디어 왼쪽 스크롤 이동 버튼
  const handleScrollLeft = () => {
    if (isMedia >= 0 && imgRef.current[isMedia - 1]) {
      mediaRef.current.scrollLeft =
        mediaRef.current.scrollLeft -
        imgRef.current[isMedia - 1].current.offsetWidth -
        20;
      setMedia(isMedia - 1);
    }
  };

  // 피드 수정
  const handleReplyPatch = () => {
    return;
  };

  // 피드 단일 삭제
  const { mutate: deleteFeed } = useDeleteFeed(items.feedId, accesstoken);
  const handleReplyDelete = () => {
    return deleteFeed();
  };

  // 피드 신고
  const [reportModal, setReportModal] = useRecoilState(reportAtom);
  const handleReplyReport = () =>
    setReportModal({ ...reportModal, sort: "feed", feedId: items.feedId });

  // 설정 드롭다운 버튼 종류 및 핸들러 연결
  const settingContent = {
    수정하기: handleReplyPatch,
    삭제하기: handleReplyDelete,
    신고하기: handleReplyReport,
  };

  return (
    <Feed>
      <FeedHeader>
        <Profile>
          <ProfileBox>
            {items.member.imageUrl ? (
              <ProfileImg src={items.member.imageUrl} alt="프로필 사진" />
            ) : (
              <Unknown />
            )}
          </ProfileBox>
          <div>
            <UserName>{items.member.nickname}</UserName>
            {items.address && (
              <FeedAddress>
                <PinPoint />
                {items.address}
              </FeedAddress>
            )}
          </div>
        </Profile>
        <UploadTime>
          {today.getFullYear() !== feedDate[0]
            ? `${today.getFullYear() - feedDate[0]}년 전`
            : today.getMonth() + 1 !== feedDate[1]
            ? `${today.getMonth() + 1 - feedDate[1]}개월 전`
            : today.getDate() !== feedDate[0]
            ? `${today.getDate() - feedDate[2]}일 전`
            : today.getHours() !== feedTime[0]
            ? `${today.getHours() - feedTime[0]}시간 전`
            : today.getMinutes() !== feedTime[1]
            ? `${today.getMinutes() - feedTime[1]}분 전`
            : `${today.getSeconds() - feedTime[2]}초 전`}
        </UploadTime>
        <SettingBox onClick={handleSetting} onBlur={() => setSetting(false)}>
          <Setting />
          {isSetting && (
            <Dropdown
              setting={settingContent}
              handleCloseDropdown={handleCloseDropdown}
            />
          )}
        </SettingBox>
      </FeedHeader>
      <FeedContents>
        <FeedTitle>{items.title}</FeedTitle>
        <FeedContent>{items.content}</FeedContent>
      </FeedContents>

      {(items.images.length > 0 || items.videos) && (
        <FeedMedia>
          <LeftScroll onClick={() => handleScrollLeft()} />
          <FeedImgs ref={mediaRef}>
            {items.videos && (
              <FeedVideo
                ref={imgRef.current[0]}
                src={items.videos}
                onClick={() => {
                  console.log(items.videos);
                }}
              />
            )}
            {items.images.length > 0 &&
              items.images.map((el, idx) => (
                <FeedImg
                  key={idx}
                  ref={imgRef.current[idx + 1]}
                  src={el}
                  alt={`피드 이미지${idx + 1}`}
                  onClick={() => {
                    handleMoreReview();
                  }}
                />
              ))}
          </FeedImgs>
          <RightScroll onClick={() => handleScrollRight()} />
        </FeedMedia>
      )}

      <FeedStatus>
        <LikeBox>
          <Heart
            width="30px"
            height="30px"
            isLike={isLike}
            handleFunc={handleLike}
          />
          <span>{items.likeCount}</span>
        </LikeBox>
        <Bookmark
          width="30px"
          height="30px"
          isBookmark={isBookmark}
          handleFunc={handleBookmark}
        />
      </FeedStatus>
      <FeedBottom>
        <ReviewCount onClick={handleMoreReview}>
          댓글 {items.repliesCount}개 모두 보기
        </ReviewCount>
      </FeedBottom>
      {isDetail && (
        <FeedDetail feedId={items.feedId} handleMoreReview={handleMoreReview} />
      )}
    </Feed>
  );
};

export default FeedList;
