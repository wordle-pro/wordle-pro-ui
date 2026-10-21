import useHello from '@/common/hooks/useHello';
import type { User } from '@/common/hooks/useSignup';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';


const Hello = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<User>(['user', 'me']);
  const {
    data
  } = useHello(currentUser?.username || "Guest");
  return (
    <div className="text-white">Hello {data?.message}!</div>
  );
}

export const Route = createFileRoute('/')({
  component: Hello,
});
