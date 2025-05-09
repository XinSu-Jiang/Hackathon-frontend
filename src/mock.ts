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
