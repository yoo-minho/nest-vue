import { getImage } from '@/util/ImageUtil';
import { QVueGlobals } from 'quasar';
import { useKakao } from 'vue3-kakao-sdk';

const { kakao } = useKakao();

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
  kakao.value.Link.sendCustom({
    templateId: 82775,
    templateArgs: {
      title: '라이언이 즐겨먹던 바로 그 틴케이스 치즈볼',
      description: '바라만 봐도 즐거워지는 힐링 패키지에는 시크릿 스토리가 숨어있어요.',
    },
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
