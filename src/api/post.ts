import { Apply, PostItem, PostPayload } from '@/types/post';
import { axiosInstance } from './axios';
import { BaseQueryParams } from '@/types/query';
import { PageResponse } from '@/types/query';
import { END_POINTS, PAGE_SIZE } from '@/constants/api';
import { buildParams } from '@/utils/object';

export const createPost = async (post: PostPayload) => {
  const newPost = {
    ...post,
    donationDate: new Date(post.donationDate).toISOString(),
  };
  const response = await axiosInstance.post(END_POINTS.POSTS, newPost);
  return response.data;
};

export const getPost = async (id: number) => {
  const response = await axiosInstance.get(`${END_POINTS.POSTS}/${id}`, {
    useAuth: false,
  });
  return response.data;
};
export type PostApiResponse = PageResponse<PostItem>;

type PostQueryParams = BaseQueryParams & {
  location?: string | null;
  category?: string | null;
  sort?: string | null;
  q?: string | null;
};

export const getPosts = async ({
  sort,
  location,
  category,
  q,
  pageParam = 0,
}: {
  sort: string;
  location?: string | null;

  category?: string | null;
  q?: string;
  pageParam?: number;
}) => {
  const baseParams: BaseQueryParams = {
    page: pageParam,
    size: PAGE_SIZE,
    sort: `createdAt,${sort}`,
  };

  const optionalParams: Partial<PostQueryParams> = {
    location,
    category,
    q,
  };

  const apiParams = buildParams(baseParams, optionalParams);

  const response = await axiosInstance.get<PostApiResponse>(END_POINTS.POSTS, {
    params: apiParams,
    useAuth: false,
  });

  return response.data;
};

export const postApply = async (postId: number) => {
  const response = await axiosInstance.post(
    `${END_POINTS.POSTS}/${postId}/applications`,
  );
  return response.data;
};

export type ApplicationApiResponse = PageResponse<Apply>;
export const getApplications = async ({
  postId,
  pageParam,
}: {
  postId: number;
  pageParam?: number;
}) => {
  const response = await axiosInstance.get<ApplicationApiResponse>(
    `${END_POINTS.POSTS}/${postId}/applications`,
    {
      params: {
        page: pageParam,
        size: PAGE_SIZE,
      },
      useAuth: true,
    },
  );
  return response.data;
};
export type Review = {
  id: number;
  reviewer: {
    id: number;
    nickname: string;
  };
  post: {
    id: number;
    title: string;
  };
  comment: string;
  createdAt: string;
};
export type getReviewsApiResponse = PageResponse<Review>;
export const getReviews = async ({
  userId,
  pageParam,
}: {
  userId: number;
  pageParam?: number;
}) => {
  const response = await axiosInstance.get<getReviewsApiResponse>(
    `${END_POINTS.POSTS_REVIEWS(userId)}`,
    {
      params: {
        page: pageParam,
        size: PAGE_SIZE,
      },
    },
  );
  return response.data;
};

type Notification = {
  id: number;
  title: string;
  createdAt: string;
  linkUrl: string;
  isRead: boolean;
};
export type notificationApiResponse = PageResponse<Notification>;
export const getNotifications = async ({
  pageParam,
}: {
  pageParam?: number;
}) => {
  const response = await axiosInstance.get<notificationApiResponse>(
    END_POINTS.MY_NOTIFICATIONS,
    {
      params: {
        page: pageParam,
        size: PAGE_SIZE,
      },
    },
  );
  return response.data;
};

export const postAllocation = async ({
  applyId,
  status,
}: {
  applyId: number;
  status: string;
}) => {
  const response = await axiosInstance.put(`/applications/${applyId}`, {
    status,
  });
  return response.data;
};

export const postAnalyze = async (userId: number) => {
  const response = await axiosInstance.get(`users/${userId}/analysis`, {
    useAuth: false,
  });
  return response.data;
};
