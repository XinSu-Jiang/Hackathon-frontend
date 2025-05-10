import BottomNavBar from '@/components/BottomNavBar';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Outlet />
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Root;
