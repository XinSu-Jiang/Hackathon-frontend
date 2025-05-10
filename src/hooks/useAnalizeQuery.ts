import { useQuery } from '@tanstack/react-query';
import { postAnalyze } from '@/api/post';
import { useSuspenseQuery } from '@tanstack/react-query';

const useAnalizeQuery = (userId: number) => {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['analize', userId],
    queryFn: () => postAnalyze(userId),
  });

  return { data, isLoading, error };
};

export default useAnalizeQuery;
