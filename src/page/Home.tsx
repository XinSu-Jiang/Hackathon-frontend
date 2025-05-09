import AutoHideNavbar from '@/components/AutoHideNavbar';
import { mockPostItems } from '@/mock';
import React, { useState } from 'react';
import {
  BASE_DRAWER_CONFIGS,
  CATEGORY_CODES,
  DrawerType,
  SORT_TYPE_CODES,
} from '@/constants/post';
import FilterChip from '@/components/FilterChip';
import FilterDrawer from '@/components/FilterDrawer';
import { ChevronDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import useSearch from '@/hooks/useSearch';
import { getPosts, PostApiResponse } from '@/api/post';
import { InfiniteData } from '@tanstack/react-query';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

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
        location: location,
        category: CATEGORY_CODES[category as keyof typeof CATEGORY_CODES],
        q: searchQuery,
        pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.last ? null : lastPage.number + 1,
    initialPageParam: 0,
  });

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

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
    <div className="bg-white">
      <div className="flex justify-between p-2">
        <button
          className={cn(
            'flex items-center justify-center gap-0.5 rounded-2xl px-2 py-1',
          )}
          onClick={() => openDrawer('location')}
        >
          <h1 className="text-dark-light text-xl font-bold">{location}</h1>
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
              sort === '오래된 순' && 'text-amber-400',
            )}
            onClick={() => setSort('오래된 순')}
          >
            오래된 순
          </button>
        </div>
      </div>
      <div className="flex h-[1000px] flex-col gap-4 p-4">
        {mockPostItems.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-1 border-b border-gray-200 pb-4"
          >
            <div className="flex w-fit justify-center rounded-full bg-gray-400 px-2 py-1 text-xs text-gray-200">
              <p>{post.category}</p>
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
          {!hasNextPage &&
            posts &&
            posts.length === 0 &&
            !error &&
            !noResults && (
              <p className="text-sm text-gray-400">
                모든 게시글을 불러왔습니다.
              </p>
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
      <button
        onClick={() => {
          navigate('/create-post');
        }}
        className="fixed right-5 bottom-20 mx-auto flex w-fit items-center gap-0.5 rounded-2xl bg-amber-400 px-4 py-2 text-white"
      >
        <Plus size={16} />
        <p>글쓰기</p>
      </button>
    </div>
  );
};

export default Home;
