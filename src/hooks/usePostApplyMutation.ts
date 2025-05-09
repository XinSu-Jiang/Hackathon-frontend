import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApply } from '@/api/post';
import { useNavigate } from 'react-router';
import { Apply } from '@/types/post';

const usePostApplyMutation = (postId: number) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation<Apply, Error, void>({
    mutationFn: () => postApply(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['apply', postId],
      });
      navigate('/');
    },
  });

  return mutation;
};

export default usePostApplyMutation;
