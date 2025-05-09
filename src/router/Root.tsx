import BottomNavBar from '@/components/BottomNavBar';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div className="">
      <div className="min-h-screen overflow-y-auto">
        <Outlet />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Root;
