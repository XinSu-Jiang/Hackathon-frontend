import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAllocation } from '@/api/post';
import { useNavigate } from 'react-router';

const usePostAllocationMutation = (postId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ status }: { status: string }) =>
      postAllocation({ postId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', postId.toString()],
      });
    },
  });

  return mutation;
};

export default usePostAllocationMutation;
