import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAllocation } from '@/api/post';

const usePostAllocationMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ applyId, status }: { applyId: number; status: string }) =>
      postAllocation({ applyId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['applications'],
      });
    },
  });

  return mutation;
};

export default usePostAllocationMutation;
