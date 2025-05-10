const BASE_URL =
  'http://hackathon-alb-463254656.ap-northeast-2.elb.amazonaws.com';

export const END_POINTS = {
  POSTS: '/posts',
  POSTS_BY_USER: (userId: number) => `/users/${userId}/posts`,
  POSTS_REVIEWS: (userId: number) => `/users/${userId}/reviews/received`,
  POSTS_REVIEWS_BY_USER: (userId: number) => `/users/${userId}/reviews`,
  GOOGLE_LOGIN: `${BASE_URL}/oauth2/authorization/google`,
  KAKAO_LOGIN: `${BASE_URL}/oauth2/authorization/kakao`,
  NAVER_LOGIN: `${BASE_URL}/oauth2/authorization/naver`,
  REDIRECT_URI: '/oauth2/redirect',
  TOKEN_REFRESH: '/token/refresh',
  USER_INFO: '/users/me',
  MY_FAVORITES: '/me/favorites',
  MY_INFO: '/me',
  MY_NOTIFICATIONS: 'users/me/notifications',
  PRESIGNED_URLS: '/recipes/presigned-urls',
};

export const USER_ERROR_MESSAGE = {
  E500: '인증 정보가 올바르지 않습니다. 다시 시도해 주세요.',
  E501: '로그인 정보가 유효하지 않습니다. 새로 로그인해 주세요.',
  E502: '로그인 세션이 만료되었습니다. 다시 로그인해 주세요.',
  E510: '권한이 없습니다. 관리자에게 문의하세요.',
  E601: '필수 입력값이 누락되었습니다. 입력을 확인해 주세요.',
  E661: '요청하신 배너를 찾을 수 없습니다.',
  E401: '해당 코스를 찾을 수 없습니다.',
  E402: '코스에 요청한 장소가 포함되지 않았습니다.',
  E404: '추가하려는 장소가 올바르지 않습니다. 다시 확인해 주세요.',
  E405: '장소 순서가 올바르지 않습니다. 다시 시도해 주세요.',
  E406: '해당 코스를 수정할 권한이 없습니다.',
  E301: '해당 지도를 찾을 수 없습니다.',
  E302: '지도의 요청한 장소를 찾을 수 없습니다.',
  E303: '해당 장소가 이미 존재합니다.',
  E304: '유효하지 않은 지도입니다. 다시 확인해 주세요.',
  E201: '요청한 장소를 찾을 수 없습니다.',
  E999: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  E900: '양식이 잘못 되었습니다. 다시 확인해 주세요.',
};

export const PAGE_SIZE = 10;
