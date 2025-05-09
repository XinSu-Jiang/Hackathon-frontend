import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useUserStore } from '@/store/useUserStore';

const LoginCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAction } = useUserStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('accessToken');

    if (token) {
      loginAction(token);
      navigate('/', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [location.search, loginAction, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default LoginCallback;
