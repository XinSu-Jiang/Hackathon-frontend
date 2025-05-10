import { PostApiResponse, getPosts } from '@/api/post';
import { CATEGORY_CODES_TO_STRING } from '@/constants/post';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useUserStore } from '@/store/useUserStore';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

type MyPostsTabContentProps = {
  userId: number;
};

const MyPostsTabContent = ({ userId }: MyPostsTabContentProps) => {
  const [sort, setSort] = useState<'ASC' | 'DESC'>('ASC');
  const navigate = useNavigate();
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
    [string, number, 'ASC' | 'DESC'],
    number
  >({
    queryKey: ['my-posts', userId, sort],
    queryFn: ({ pageParam }) =>
      getPosts({
        sort,
        pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.last ? null : lastPage.number + 1,
    initialPageParam: 0,
  });

  const posts = data?.pages.flatMap((page) => page.content) ?? [];
  const noResults = posts.length === 0 && !isFetching;
  const noResultsMessage =
    posts.length === 0 ? '작성한 게시글이 없습니다.' : '게시글을 작성해보세요.';

  return (
    <div className="flex flex-col gap-4 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col gap-1 border-b border-gray-200 pb-4"
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          <div className="flex w-fit justify-center rounded-full bg-gray-400 px-2 py-1 text-xs text-gray-200">
            <p>{CATEGORY_CODES_TO_STRING[post.category]}</p>
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
  );
};

export default MyPostsTabContent;
