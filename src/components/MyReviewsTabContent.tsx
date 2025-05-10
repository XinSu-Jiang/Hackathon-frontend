import { getReviews, getReviewsApiResponse } from '@/api/post';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

type MyReviewsTabContentProps = {
  userId: number;
};

const MyReviewsTabContent = ({ userId }: MyReviewsTabContentProps) => {
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
    getReviewsApiResponse,
    Error,
    InfiniteData<getReviewsApiResponse>,
    [string, number, 'ASC' | 'DESC'],
    number
  >({
    queryKey: ['my-posts', userId, sort],
    queryFn: ({ pageParam }) =>
      getReviews({
        pageParam,
        userId,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.last ? null : lastPage.number + 1,
    initialPageParam: 0,
  });

  const reviews = data?.pages.flatMap((page) => page.content) ?? [];
  console.log(reviews);
  const noResults = reviews.length === 0 && !isFetching;
  const noResultsMessage =
    reviews.length === 0 ? '받은 리뷰가 없습니다.' : '리뷰를 작성해보세요.';

  return (
    <div className="flex flex-col gap-4 p-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-1 border-b border-gray-200 pb-4"
          onClick={() => navigate(`/posts/${review.id}`)}
        >
          <p className="text-lg font-bold">{review.post.title}</p>
          <p className="truncate overflow-hidden text-sm text-gray-500">
            {review.comment}
          </p>
          <p className="text-sm text-gray-500">{`${review.reviewer.nickname}님에게 받은 리뷰`}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <p>{review.createdAt}</p>
          </div>
        </div>
      ))}
      <div ref={ref} className="h-10 text-center">
        {!hasNextPage && !error && !noResults && (
          <p className="text-sm text-gray-400">모든 리뷰를 불러왔습니다.</p>
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

export default MyReviewsTabContent;
