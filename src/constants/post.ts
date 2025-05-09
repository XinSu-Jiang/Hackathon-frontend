export const LOCATIONS = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

export const CATEGORY_CODES = {
  '교육/학습': 'EDU',
  '상담/멘토링': 'MENTOR',
  '기술/IT지원': 'IT',
  '문화/예술': 'ART',
  '생활/편의': 'LIFE',
  '언어지원/번역': 'TRANSLATE',
  '기타 재능': 'OTHER',
};

export const CATEGORY_CODES_TO_STRING = Object.fromEntries(
  Object.entries(CATEGORY_CODES).map(([key, value]) => [value, key]),
);

export const CATEGORY_TYPES = Object.keys(CATEGORY_CODES);

export const SORT_TYPES = ['최신순', '오래된순'];

export const SORT_TYPE_CODES = {
  최신순: 'desc',
  오래된순: 'asc',
};

export const DRAWER_HEADERS = {
  location: '지역 선택',
  sort: '정렬 방식 선택',
};

export const DRAWER_DESCRIPTIONS = {
  location: '원하는 지역을 선택하세요.',
  sort: '원하는 정렬 방식을 선택하세요.',
};

export type DrawerType = 'location' | 'sort';

export type BaseDrawerConfig = {
  header: string;
  description?: string;
  isMultiple: boolean;
  availableValues: string[];
};

export const BASE_DRAWER_CONFIGS: Record<DrawerType, BaseDrawerConfig> = {
  location: {
    header: DRAWER_HEADERS.location,
    description: DRAWER_DESCRIPTIONS.location,
    isMultiple: false,
    availableValues: LOCATIONS,
  },
  sort: {
    header: DRAWER_HEADERS.sort,
    isMultiple: false,
    availableValues: SORT_TYPES,
  },
};

export type FinalDrawerConfig = BaseDrawerConfig & {
  type: DrawerType;
  initialValue: string | string[];
  setValue: (value: string | string[]) => void;
};

export const code = ['PENDING', 'ACCEPTED', 'REJECTED'];
