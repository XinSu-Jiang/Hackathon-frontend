import {
  ChefHat,
  Home,
  Plus,
  Refrigerator,
  Search,
  Sparkles,
  User,
} from 'lucide-react';
import BottomNavButton from '@/components/BottomNavButton';
import { useLocation } from 'react-router';

const showNavbar = (path: string) => {
  const targetPaths = ['/posts', '/create-post'];
  let isShow = false;
  targetPaths.forEach((targetPath) => {
    if (path.includes(targetPath)) {
      isShow = true;
    }
  });
  return isShow;
};

const BottomNavBar = () => {
  const location = useLocation();

  if (showNavbar(location.pathname)) {
    return null;
  }

  return (
    <footer className="fixed inset-x-0 right-0 bottom-0 left-0 z-40 mx-auto flex max-w-[425px] items-center justify-between border-t border-gray-200 bg-white px-6 py-3 opacity-97">
      <BottomNavButton
        path="/"
        icon={<Home size={24} className="mb-1" />}
        label="홈"
      />

      <BottomNavButton
        path="/create-post"
        icon={<Plus size={24} className="mb-1" />}
        label="포스팅"
      />

      <BottomNavButton
        path="/users/1"
        icon={<User size={24} className="mb-1" />}
        label="My"
      />
    </footer>
  );
};

export default BottomNavBar;
