import {
  ChefHat,
  Home,
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
    <footer className="fixed right-0 bottom-0 left-0 z-40 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3 opacity-97">
      <BottomNavButton
        path="/"
        icon={<Home size={24} className="mb-1" />}
        label="홈"
      />

      <BottomNavButton
        path="/ingredients"
        icon={<Refrigerator size={24} className="mb-1" />}
        label="냉장고"
      />

      <BottomNavButton
        path="/air"
        icon={<Sparkles size={24} className="mb-1" />}
        label="AI 레시피"
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
