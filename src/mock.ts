import { Post, PostItem } from './types/post';
import { User } from './types/user';

export const mockUser: User = {
  id: 1,
  nickname: '타리',
  profileImage:
    'https://img.kr.gcp-karroter.net/origin/profile/202411/5b950c0505112a1ca08d3abd81fffdeecc7b23736f53b536c93f0e5b9886d8e3_0.webp?q=82&s=640x640&t=crop',
  category: '노래',
  level: 1,
};

export const mockPost: Post = {
  id: 1,
  title: '(선착순 무료) 2달 전과정/ 피아노 문화강좌(재능기부)',
  description:
    '(선착순 무료) 2달 전과정/ 피아노 문화강좌(재능기부)\n안녕하세요\n무료로 피아노 재능기부를 하시게 되서 알려드려요~!\n코드 반주법! 2달정복 가능합니다!\n40년 이상 초등학교 음악선생님께서 알기 쉽게 차근차근 알려주신대요~ 부모님, 초등학교친구들도 알 수 있게 잘 알려주시는 티칭능력으로 왕초보들도 쉽게 코드건반을 칠 수 있답니다~!!!\n매주 목요일날 3타임으로 나눠져있구요~\n왕초보,초보들에게는 아주 좋은기회예요~\n아이 학교 어린이집에맡기고 취미로 시작해보셔도 너무 좋겠죠?\n교재비와 음료비가 무료래요!\n레슨후에 무료로 연습도 가능하답니다~\n이번기회에 건반한번 쳐보시는 것 어떠세요?^^♡\n장소는 빨래방건물 지하1층이예요~',
  author: mockUser,
  appliedByCurrentUser: true,
  createdAt: '2021-01-01',
  donationDate: '2021-01-01',
  participants: [mockUser],
  currentPersonCount: 6,
  capacity: 10,
  cost: '10000',
  location: '서울 광진구',
  maxAmount: 100000,
};

export const mockPostItems: PostItem[] = [
  {
    id: 1,
    title: '중곡2동 살고있는데요 런닝장소 추천좀요 !',
    description:
      '아침 8시쯤 가는데 어디가 좋을까요 용마산거리에서 쭉가면 있는 뚝배기 런닝장소 추천좀요 !',
    category: '런닝',
    location: '서울 광진구',
    createdAt: '2021-01-01',
    status: 'RECRUITING',
  },
  {
    id: 2,
    title: '군자세븐일레븐 내일(11일) 11시-5시 대타구해요',
    description:
      '급하게 일이생겨서 대타를 구할수가없어서 여기서라도 구해봅니다',
    category: '생활/편의',
    location: '서울 광진구',
    createdAt: '2021-01-01',
    status: 'FULL',
  },
  {
    id: 3,
    title: '포르쉐 박스터 태워주실 분?',
    description:
      '박스터가 드림카인 27살입니다ㅜㅜ 포르쉐한번 타보고싶어요 제발요',
    category: '취미',
    location: '서울 광진구',
    createdAt: '2021-01-01',
    status: 'CLOSED',
  },
  {
    id: 4,
    title: '중곡2동 살고있는데요 런닝장소 추천좀요 !',
    description:
      '아침 8시쯤 가는데 어디가 좋을까요 용마산거리에서 쭉가면 있는 뚝배기 런닝장소 추천좀요 !',
    category: '런닝',
    location: '서울 광진구',
    createdAt: '2021-01-01',
    status: 'RECRUITING',
  },
  {
    id: 5,
    title: '군자세븐일레븐 내일(11일) 11시-5시 대타구해요',
    description:
      '급하게 일이생겨서 대타를 구할수가없어서 여기서라도 구해봅니다',
    category: '생활/편의',
    location: '서울 광진구',
    createdAt: '2021-01-01',
    status: 'RECRUITING',
  },
  {
    id: 6,
    title: '포르쉐 박스터 태워주실 분?',
    description:
      '박스터가 드림카인 27살입니다ㅜㅜ 포르쉐한번 타보고싶어요 제발요',
    category: '취미',
    location: '서울 광진구',
    createdAt: '2021-01-01',
    status: 'FULL',
  },
];
