import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getPost } from '@/api/post';
import { Post } from '@/types/post';

const usePostDetailQuery = (id: number) => {
  const {
    data: postData,
    isLoading,
    isError,
    error,
    refetch,
  } = useSuspenseQuery<Post, Error>({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    retry: false,
  });

  return {
    postData,
    isLoading,
    isError,
    error,
    refetchPost: refetch,
  };
};

export default usePostDetailQuery;
