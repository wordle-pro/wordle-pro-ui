import { useQuery } from '@tanstack/react-query';

type HelloResponse = {
	message: string
};

const useHello = (name: string) => {
	return useQuery({
		queryKey: ['hello', name],
    queryFn: async (): Promise<HelloResponse> => {
     const url = `${import.meta.env.VITE_WORDLE_PRO_API}/hello/${name}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      return response.json();
    },
    enabled: Boolean(name && name.trim()), 
	});
};

export default useHello;