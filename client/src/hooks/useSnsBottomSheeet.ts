import { getImage } from '@/util/ImageUtil';
import { QVueGlobals } from 'quasar';

export const showBottomSheet = ($q: QVueGlobals) => {
  $q.bottomSheet({
    message: '공유하기',
    grid: false,
    actions: [
      {
        label: 'Kakaotalk (카카오톡)',
        img: getImage('sns/kakao.png'),
        id: 'kakao',
      },
      {
        label: 'Facebook (페이스북)',
        img: getImage('sns/facebook.png'),
        id: 'facebook',
      },
      {
        label: 'Twitter (트위터)',
        img: getImage('sns/twitter.png'),
        id: 'twitter',
      },
      {
        label: 'Naver Band (네이버 밴드)',
        img: getImage('sns/band.png'),
        id: 'band',
      },
      {},
      {
        label: 'URL Copy',
        icon: 'content_copy',
        id: 'copy',
      },
      {
        label: 'Share',
        icon: 'share',
        id: 'share',
      },
    ],
  }).onOk((action) => {
    const sharedUrl = encodeURIComponent(location.href);
    const title = encodeURIComponent('팀로그');
    switch (action.id) {
      case 'kakao':
        shareKakao();
        return;
      case 'facebook':
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${sharedUrl}`, '', 'width=400, height=500');
        return;
      case 'twitter':
        window.open(
          `http://twitter.com/share?url=${sharedUrl}&text=${title}`,
          'tweetPop',
          'width=400, height=500, scrollbars=yes',
        );
        return;
      case 'band':
        window.open(
          `http://www.band.us/plugin/share?body=${title}&route=${sharedUrl}`,
          'shareBand',
          'width=400, height=500, resizable=yes',
        );
        return;
      case 'copy':
        copyUrl($q);
        return;
      case 'share':
      default:
        shareUrl($q);
        return;
    }
  });
};

const shareKakao = () => {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '오늘의 디저트',
      description: '아메리카노, 빵, 케익',
      imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com',
      },
    },
    itemContent: {
      profileText: 'Kakao',
      profileImageUrl:
        'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      titleImageText: 'Cheese cake',
      titleImageCategory: 'Cake',
      items: [
        {
          item: 'Cake1',
          itemOp: '1000원',
        },
        {
          item: 'Cake2',
          itemOp: '2000원',
        },
        {
          item: 'Cake3',
          itemOp: '3000원',
        },
        {
          item: 'Cake4',
          itemOp: '4000원',
        },
        {
          item: 'Cake5',
          itemOp: '5000원',
        },
      ],
      sum: '총 결제금액',
      sumOp: '15000원',
    },
    social: {
      likeCount: 10,
      commentCount: 20,
      sharedCount: 30,
    },
    buttons: [
      {
        title: '웹으로 이동',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      {
        title: '앱으로 이동',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
    ],
  });
};

const shareUrl = ($q: QVueGlobals) => {
  if (typeof navigator.share === 'undefined') {
    $q.notify({ type: 'nagative', message: 'Non-shareable environment!' });
    return;
  }
  navigator.share({
    title: location.href,
    url: location.href,
  });
};

const copyUrl = async ($q: QVueGlobals) => {
  if (typeof navigator.clipboard === 'undefined') {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  } else {
    await navigator.clipboard.writeText(location.href);
  }
  $q.notify({ type: 'positive', message: 'Copy Completed!' });
};
