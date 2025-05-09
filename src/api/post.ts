import { PostItem, PostPayload } from '@/types/post';
import { axiosInstance } from './axios';
import { BaseQueryParams } from '@/types/query';
import { PageResponse } from '@/types/query';
import { END_POINTS, PAGE_SIZE } from '@/constants/api';
import { buildParams } from '@/utils/object';

export const createPost = async (post: PostPayload) => {
  const response = await axiosInstance.post(END_POINTS.POSTS, post);
  return response.data;
};

export const getPost = async (id: number) => {
  const response = await axiosInstance.get(`${END_POINTS.POSTS}/${id}`);
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
    sort: `name,${sort}`,
  };

  const optionalParams: Partial<PostQueryParams> = {
    location,
    category,
    q,
  };

  const apiParams = buildParams(baseParams, optionalParams);

  const response = await axiosInstance.get<PostApiResponse>(END_POINTS.POSTS, {
    params: apiParams,
    useAuth: 'optional',
  });

  return response.data;
};
