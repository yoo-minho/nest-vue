export const shareKakao = () => {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '팀로그',
      description: '기록해요',
      imageUrl: `${location.origin}/pwa-256x256.png`,
      link: {
        mobileWebUrl: location.href,
        webUrl: location.href,
      },
    },
    buttons: [
      {
        title: '이동',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
    ],
  });
};
