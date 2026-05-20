import useHello from '@/common/hooks/useHello';
import { createFileRoute } from '@tanstack/react-router';


const Hello = () => {
  const {
    data
  } = useHello('tester');
  return (
    <div>Hello {data?.message}!</div>
  );
}

export const Route = createFileRoute('/')({
  component: Hello,
})

