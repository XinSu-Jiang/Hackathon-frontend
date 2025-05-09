import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/api/post';
import { PostPayload } from '@/types/post';
import { useNavigate } from 'react-router';

const useCreatePostMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (post: PostPayload) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
    },
  });

  return mutation;
};

export default useCreatePostMutation;
