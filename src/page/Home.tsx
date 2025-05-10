import AutoHideNavbar from '@/components/AutoHideNavbar';
import { mockPostItems } from '@/mock';
import React, { useState } from 'react';
import {
  BASE_DRAWER_CONFIGS,
  CATEGORY_CODES,
  CATEGORY_CODES_TO_STRING,
  DrawerType,
  SORT_TYPE_CODES,
} from '@/constants/post';
import FilterChip from '@/components/FilterChip';
import FilterDrawer from '@/components/FilterDrawer';
import { Bell, ChevronDown, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import useSearch from '@/hooks/useSearch';
import {
  getNotifications,
  getPosts,
  notificationApiResponse,
  PostApiResponse,
} from '@/api/post';
import { InfiniteData } from '@tanstack/react-query';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DrawerConfig = {
  type: DrawerType;
  header: string;
  description?: string;
  isMultiple: boolean;
  availableValues: string[];
  initialValue: string | string[];
  setValue: (value: string | string[]) => void;
};

const Home = () => {
  const [sort, setSort] = useState<string>('최신순');
  const [location, setLocation] = useState<string>('전체');
  const [category, setCategory] = useState<string>('전체');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [drawerConfig, setDrawerConfig] = useState<DrawerConfig | null>(null);
  const navigate = useNavigate();

  const {
    searchQuery,
    inputValue,
    handleSearchSubmit,
    handleInputChange,
    setInputValue,
  } = useSearch();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    ref,
  } = useInfiniteScroll<
    PostApiResponse,
    Error,
    InfiniteData<PostApiResponse>,
    [string, string, string, string, string],
    number
  >({
    queryKey: ['posts', location, sort, category, searchQuery],
    queryFn: ({ pageParam }) =>
      getPosts({
        sort: SORT_TYPE_CODES[sort as keyof typeof SORT_TYPE_CODES],
        location: location === '전체' ? null : location,
        category: CATEGORY_CODES[category as keyof typeof CATEGORY_CODES],
        q: searchQuery,
        pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.last ? null : lastPage.number + 1,
    initialPageParam: 0,
  });

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  const { data: notificationsData } = useInfiniteScroll<
    notificationApiResponse,
    Error,
    InfiniteData<notificationApiResponse>,
    [string],
    number
  >({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => getNotifications({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.last ? null : lastPage.number + 1,
    initialPageParam: 0,
    staleTime: 1000 * 5,
  });

  const notifications =
    notificationsData?.pages.flatMap((page) => page.content) ?? [];

  const dynamicStateAccessors = {
    location: {
      state: location,
      setState: (value: string) => {
        setLocation(value);
      },
    },
    sort: {
      state: sort,
      setState: (value: string) => {
        setSort(value);
      },
    },
  };

  const openDrawer = (type: DrawerType) => {
    const baseConfig = BASE_DRAWER_CONFIGS[type];

    const dynamicState = dynamicStateAccessors[type];

    if (!baseConfig || !dynamicState) {
      console.error(`Invalid drawer type or configuration missing: ${type}`);
      return;
    }

    const finalConfig: DrawerConfig = {
      ...baseConfig,
      type,
      initialValue: dynamicState.state,
      setValue: (value: string | string[]) => {
        dynamicState.setState(value as any);
      },
    };

    setDrawerConfig(finalConfig);
    setIsDrawerOpen(true);
  };
  const noResults = posts.length === 0 && !isFetching;
  const noResultsMessage =
    searchQuery && posts.length === 0
      ? `"${searchQuery}"에 해당하는 게시글이 없습니다.`
      : `"${location}"에 해당하는 게시글이 없습니다.`;
  return (
    <div className="mb-20 bg-white p-4">
      <div className="flex gap-2">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <input
            type="search"
            placeholder="포스팅을 검색하세요"
            className="w-full rounded-md border border-gray-300 py-2 pr-10 pl-4 focus:outline-none"
            value={inputValue}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            <Search size={18} className="text-gray-400" />
          </button>
        </form>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="text-dark relative flex w-fit items-center">
              <Bell size={20} />
              {notifications.length !== 0 ||
                (notifications[0] === undefined && (
                  <div className="absolute top-1.5 right-[-3px] h-2 w-2 rounded-full bg-amber-400"></div>
                ))}
            </div>
          </PopoverTrigger>

          <PopoverContent className="min-h-40 w-48 max-w-none border border-gray-200 bg-white">
            <div className="flex flex-col items-center justify-center gap-2">
              {notifications.length !== 0 ||
                (notifications[0] === undefined &&
                  notifications.map((notification) => (
                    <div key={notification.id}>
                      <p>{notification.title}</p>
                      <p>{notification.createdAt}</p>
                    </div>
                  )))}
              {notifications.length === 0 ||
                (notifications[0] === undefined && (
                  <p className="text-center text-sm text-gray-500">
                    알림이 없습니다.
                  </p>
                ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-between">
        <button
          className={cn(
            'flex items-center justify-center gap-0.5 rounded-2xl px-2 py-1',
          )}
          onClick={() => openDrawer('location')}
        >
          <h1 className="text-dark-light font-bold">{location}</h1>
          <ChevronDown className="text-dark-light" size={20} />
        </button>
        <div className="flex items-center gap-1 text-gray-500">
          <button
            className={cn(
              'rounded-2xl text-sm',
              sort === '최신순' && 'text-amber-400',
            )}
            onClick={() => setSort('최신순')}
          >
            최신순
          </button>
          <p>|</p>
          <button
            className={cn(
              'rounded-2xl text-sm',
              sort === '오래된순' && 'text-amber-400',
            )}
            onClick={() => setSort('오래된순')}
          >
            오래된순
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-1 border-b border-gray-200 pb-4"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div className="flex w-fit justify-center rounded-full bg-gray-400 px-2 py-1 text-xs text-gray-200">
              <p>
                {
                  CATEGORY_CODES_TO_STRING[
                    post.category as keyof typeof CATEGORY_CODES
                  ]
                }
              </p>
            </div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="truncate overflow-hidden text-sm text-gray-500">
              {post.description}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <p>{post.location}</p>
              <p>{post.createdAt}</p>
            </div>
          </div>
        ))}
        <div ref={ref} className="h-10 text-center">
          {!hasNextPage && !error && !noResults && (
            <p className="text-sm text-gray-400">모든 게시글을 불러왔습니다.</p>
          )}
        </div>
        {noResults && (
          <p className="py-10 text-center text-gray-500">{noResultsMessage}</p>
        )}
        {error && (
          <p className="py-10 text-center text-red-500">{error.message}</p>
        )}
      </div>
      <FilterDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        isMultiple={drawerConfig?.isMultiple ?? false}
        setValue={drawerConfig?.setValue ?? (() => {})}
        initialValue={drawerConfig?.initialValue ?? ''}
        availableValues={drawerConfig?.availableValues ?? []}
        header={drawerConfig?.header ?? ''}
        description={drawerConfig?.description ?? ''}
      />
    </div>
  );
};

export default Home;
