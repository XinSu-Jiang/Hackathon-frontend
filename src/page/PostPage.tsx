import React, { Suspense, useState } from 'react';

import { Check, X, Gift } from 'lucide-react';
import AutoHideNavbar from '@/components/AutoHideNavbar';
import { Button } from '@/components/ui/button';
import SponsorshipDrawer from '@/components/SponsorshipDrawer';
import usePostDetailQuery from '@/hooks/usePostDetailQuery';
import { useNavigate, useParams } from 'react-router';
import { useUserStore } from '@/store/useUserStore';
import { Apply } from '@/types/post';
import usePostApplyMutation from '@/hooks/usePostApplyMutation';
import { useToastStore } from '@/store/useToastStore';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { InfiniteData } from '@tanstack/react-query';
import { ApplicationApiResponse, getApplications } from '@/api/post';
import PrevButton from '@/components/PrevButton';
import usePostAllocationMutation from '@/hooks/usePostAllocationMutation';
import LoadingDiv from '@/components/LoadingDiv';
import useAnalizeQuery from '@/hooks/useAnalizeQuery';
const PostPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { postId } = useParams();
  const { postData } = usePostDetailQuery(Number(postId));
  const { user } = useUserStore();

  const remainingSpots = postData.capacity - postData.currentPersonCount;
  const supportProgress =
    postData.maxamount > 0
      ? (postData.currentDonationAmount / postData.maxamount) * 100
      : 0;
  const participantProgress =
    postData.capacity > 0
      ? (postData.currentPersonCount / postData.capacity) * 100
      : 0;

  const buttonMessage = () => {
    if (postData.myApplicationStatus === 'PENDING') {
      return '승인 대기중';
    } else if (postData.myApplicationStatus === 'ACCEPTED') {
      return '승인 완료';
    } else if (postData.myApplicationStatus === 'REJECTED') {
      return '승인 거절';
    }

    if (remainingSpots > 0) {
      return '참여하기';
    } else if (remainingSpots === 0) {
      return '모집 마감';
    } else if (remainingSpots < 0) {
      return '모집 완료';
    }
  };
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
    ApplicationApiResponse,
    Error,
    InfiniteData<ApplicationApiResponse>,
    [string, string?],
    number
  >({
    queryKey: ['applications'],
    queryFn: ({ pageParam }) =>
      getApplications({ postId: Number(postId), pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.last && lastPage.number === 0 ? null : lastPage.number + 1,
    initialPageParam: 0,
  });

  const applies = data?.pages.flatMap((page) => page.content) ?? [];

  const { mutate: applyPost } = usePostApplyMutation(Number(postId));
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const handleApplyPost = () => {
    applyPost(undefined, {
      onSuccess: () => {
        addToast({
          message: '포스팅에 참여하였습니다.',
          variant: 'default',
        });
      },
    });
  };

  const { mutate: allocationPost } = usePostAllocationMutation();

  const handleAllocationPost = (
    applyId: number,
    status: 'ACCEPTED' | 'REJECTED',
  ) => {
    allocationPost(
      {
        applyId,
        status,
      },
      {
        onSuccess: () => {
          addToast({
            message: '승인 완료',
            variant: 'default',
          });
        },
      },
    );
  };

  return (
    <div className="mb-20 min-h-screen bg-white p-4">
      <AutoHideNavbar>
        <div className="flex items-center gap-2">
          <PrevButton />
          <p className="text-lg font-bold text-slate-800">{postData.title}</p>
        </div>
      </AutoHideNavbar>
      <main className="container mx-auto mt-10 mb-15 space-y-6 p-4 md:p-6">
        <div
          className="flex items-center space-x-4"
          onClick={() => navigate(`/users/${postData.author.id}`)}
        >
          <img
            src={
              postData.author.profileImage ||
              `https://ui-avatars.com/api/?name=${postData.author.nickname}&background=random`
            }
            alt={postData.author.nickname}
            className="h-16 w-16 rounded-full border-2 border-slate-200 object-cover md:h-20 md:w-20"
          />
          <div className="flex-grow">
            <p className="text-lg font-bold text-slate-800">
              {postData.author.nickname}
            </p>
            <p className="text-sm text-slate-500">
              {postData.author.category} | Level {postData.author.level}
            </p>
            <div className="mt-1.5 flex items-center">
              <span className="text-md font-semibold text-amber-600">
                {postData.author.deokPoints} DUCK
              </span>
            </div>
          </div>
        </div>

        <h1 className="mb-4 text-2xl leading-tight font-bold text-slate-800 md:text-3xl">
          {postData.title}
        </h1>
        <div className="bg-olive flex w-15 justify-center rounded-2xl p-2 text-sm text-white">
          <p>모집중</p>
        </div>

        <p className="leading-relaxed whitespace-pre-line text-slate-600">
          {postData.description}
        </p>

        <h2 className="mb-4 text-xl font-semibold text-slate-700">모집 현황</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">모집 정원</span>
            <span className="font-semibold text-slate-800">
              {postData.capacity}명
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">현재 신청자</span>
            <span className="font-semibold text-slate-800">
              {postData.currentPersonCount}명
            </span>
          </div>

          <div>
            <div className="h-2.5 w-full rounded-full bg-slate-200">
              <div
                className="h-2.5 rounded-full bg-amber-500 transition-all duration-500 ease-out"
                style={{ width: `${participantProgress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-right text-xs font-medium text-amber-600">
              {remainingSpots > 0 ? `${remainingSpots}명 남음` : '모집 완료'}
            </div>
          </div>
          <h2 className="mb-1 text-xl font-semibold text-slate-700">
            이 프로젝트를 응원해주세요!
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            현재{' '}
            <span className="font-bold text-amber-500">
              {postData.currentDonationAmount.toLocaleString()}원
            </span>
            이 모였습니다.
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline" // 또는 다른 variant
            className="border-amber-500 font-semibold text-amber-600 hover:bg-amber-50 hover:text-amber-700"
          >
            자세히 보고 후원하기
          </Button>
        </div>
      </main>

      {postData.author.id === user?.id && (
        <>
          <h2 className="mb-4 text-xl font-semibold text-slate-700">
            신청자 목록
          </h2>
          <div className="flex flex-col items-center justify-center gap-1">
            {applies.length !== 0 ? (
              applies.map((apply) => (
                <div
                  key={apply.id}
                  className="flex w-full items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={apply.user.profileImage}
                      alt={apply.user.nickname}
                      className="h-10 w-10 rounded-full border-2 border-slate-200 object-cover"
                    />
                    <p className="text-sm">{apply.user.nickname}</p>
                  </div>
                  {apply.status !== 'ACCEPTED' ? (
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-green flex h-8 w-8 items-center justify-center rounded-2xl p-2 text-sm text-white"
                        onClick={() =>
                          handleAllocationPost(apply.id, 'ACCEPTED')
                        }
                      >
                        <Check />
                      </button>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-2xl bg-red-300 p-2 text-sm text-white"
                        onClick={() =>
                          handleAllocationPost(apply.id, 'REJECTED')
                        }
                      >
                        <X />
                      </button>
                    </div>
                  ) : (
                    <p className="rounded-md border border-dashed border-gray-400 px-2 py-1 text-sm text-gray-400">
                      승인 완료
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                신청자가 없습니다.
              </p>
            )}
          </div>
        </>
      )}
      <Suspense
        fallback={
          <div className="mb-2 flex h-fit w-fit items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
            <p className="text-sm text-gray-600">
              AI가 사용자를 분석중입니다...
            </p>
          </div>
        }
      >
        <LoadingDiv userId={postData.author.id} />
      </Suspense>

      <div className="fixed right-0 bottom-0 left-0 mx-auto max-w-[425px] border-t border-slate-200 bg-white p-4 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          disabled={remainingSpots <= 0}
          onClick={handleApplyPost}
          className={`focus:ring-opacity-50 w-full rounded-lg px-4 py-3.5 text-lg font-bold text-white shadow-md transition-colors duration-150 ease-in-out hover:shadow-lg focus:ring-2 focus:outline-none ${
            remainingSpots > 0
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800'
              : 'cursor-not-allowed bg-slate-400'
          }`}
        >
          {buttonMessage()}
        </button>
      </div>
      <SponsorshipDrawer
        open={isOpen}
        onOpenChange={setIsOpen}
        maxSupportAmount={postData.maxamount ?? 0}
        onConfirmSupport={() => {
          // 후원 확정 시 필요한 로직 추가
        }}
      />
    </div>
  );
};

export default PostPage;
