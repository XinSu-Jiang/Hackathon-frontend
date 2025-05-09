import { END_POINTS } from '@/constants/api';

type NaverLoginButtonProps = {
  className?: string;
};

const NaverLoginButton = ({ className }: NaverLoginButtonProps) => {
  return (
    <a
      href={END_POINTS.NAVER_LOGIN}
      className={`flex h-12 w-3/4 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#03c75a] text-white ${className}`}
    >
      <img src="/NaverIcon.png" className="h-12 w-12" />
      <p>네이버로 시작하기</p>
    </a>
  );
};

export default NaverLoginButton;
