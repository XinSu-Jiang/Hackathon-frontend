import GoogleLoginButton from '@/components/Button/GoogleLoginButton';
import KakaoLoginButton from '@/components/Button/KakaoLoginButton';
import NaverLoginButton from '@/components/Button/NaverLoginButton';
import DuckIcon from '@/icons/DuckIcon';
import { useNavigate } from 'react-router';
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="scrollbar-hide flex h-screen flex-col items-center justify-center gap-2 overflow-y-auto bg-[#fbefdb]">
      <DuckIcon width={100} height={100} />
      <GoogleLoginButton />
      <NaverLoginButton />
      <KakaoLoginButton />
      <button
        onClick={() => navigate('/')}
        className="cursor-pointer text-sm text-[#747775] underline"
      >
        로그인 없이 볼게요
      </button>
    </div>
  );
};

export default LoginPage;
