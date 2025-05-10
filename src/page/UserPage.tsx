import React, { useState } from 'react';
import { User } from '@/types/user';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Share,
  Edit,
  Heart,
  Clock,
  ChevronLeft,
  BookOpen,
  LucideIcon,
  Award,
  Users,
  Bookmark,
  Calendar,
  LogIn,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useUserStore } from '@/store/useUserStore';
import MyPostsTabContent from '@/components/MyPostsTabContent';
import DuckEggIcon from '@/icons/DuckEggIcon';
import DuckIcon from '@/icons/DuckIcon';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const UserDetailPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('나의 포스팅');

  const guestUser: User = {
    id: 0,
    nickname: '게스트',
    profileImage: '/default-profile.png',
    profileContent: '로그인하여 더 많은 기능을 사용해보세요.',
  };
  const tabs: Tab[] = [
    { id: '나의 포스팅', label: '나의 포스팅', icon: Award },
    { id: '내가 받은 칭찬', label: '내가 받은 칭찬', icon: BookOpen },
  ];

  const getPostsByTab = () => {
    switch (activeTab) {
      case '나의 포스팅':
        return <MyPostsTabContent userId={displayUser.id} />;
      case '내가 받은 칭찬':
        return <></>;
      default:
        return <></>;
    }
  };

  const displayUser = user ? user : guestUser;

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-cgray mb-20 flex min-h-screen flex-col overflow-hidden">
      <div className="z-30 bg-white p-4">
        <h2 className="text-2xl font-bold">프로필</h2>
      </div>

      <div className="relative z-10 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <img
                  src={displayUser.profileImage}
                  alt={displayUser.nickname}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mb-2 ml-4">
              <h2 className="text-2xl font-bold text-black">
                {displayUser.nickname}
              </h2>
              <div className="flex items-center gap-1">
                {displayUser?.seedMoneyBalance ? (
                  <DuckEggIcon width={30} height={30} />
                ) : (
                  <DuckEggIcon width={30} height={30} />
                )}
                <p className="text-sm text-gray-500">
                  {displayUser?.seedMoneyBalance ?? 0}
                </p>
                <DuckIcon width={30} height={30} />
                <p className="text-sm text-gray-500">
                  {displayUser?.deokPoints}
                </p>
              </div>
            </div>
          </div>
          {!user ? (
            <Button
              className="bg-olive hover:bg-olive-dark rounded-full px-6 text-white"
              onClick={handleLoginClick}
            >
              <LogIn size={16} className="mr-1" /> 로그인
            </Button>
          ) : null}
        </div>
      </div>
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`relative flex-1 py-4 ${
                activeTab === tab.id
                  ? 'font-bold text-amber-400'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="flex flex-col items-center">
                <tab.icon size={18} className="mb-1" />
                <p>{tab.label}</p>
              </span>
              {activeTab === tab.id && (
                <div className="absolute right-0 bottom-0 left-0 h-[3px] bg-amber-400" />
              )}
            </button>
          ))}
        </div>
      </div>
      {user ? (
        getPostsByTab()
      ) : (
        <div className="flex grow flex-col items-center justify-center p-10 text-center">
          <p className="mb-4 text-gray-500">
            로그인하여 포스팅을 관리해보세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
