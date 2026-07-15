import useHello from '@/common/hooks/useHello';
import { createFileRoute } from '@tanstack/react-router';


const Hello = () => {
  const {
    data
  } = useHello('tester');
  return (
    <div className="text-white">Hello {data?.message}!</div>
  );
}

export const Route = createFileRoute('/')({
  component: Hello,
});
