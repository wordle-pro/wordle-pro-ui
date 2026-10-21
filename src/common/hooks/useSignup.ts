import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const SignupAPIBodySchema = z.object(
	{
		email: z.email(),
		password: z
			.string()
			.min(6, 'Password must be at least 6 characters long')
			.regex(/^(?=.*[A-Z])(?=.*[0-9]).*$/, 'Password must include at least 1 uppercase letter and 1 number'),
		username: z
			.string()
			.min(3, 'Username must be at least 3 characters long')
			.max(20, 'Username must be under 20 characters')
			.regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
	}	
);

export type SignupBodyInput = z.infer<typeof SignupAPIBodySchema>;

const signupErrorResponseSchema = z.object({
  error: z.string(),
});

const UserSchema =  z.object({
	id: z.uuidv4(),
	email: z.email(),
	username: z.string()
});

const SignupAPISuccessSchema = z.object({
	message: z.string(),
	user: UserSchema
});

export type User = z.infer<typeof UserSchema>

export type SignupSuccessResponse = z.infer<typeof SignupAPISuccessSchema>;

const signupUser = async (signupBody: SignupBodyInput): Promise<SignupSuccessResponse> => {
	const url = `${import.meta.env.VITE_WORDLE_PRO_API}/auth/signup`;
	const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupBody),
  });
	

  if (!res.ok) {
    const errorData = await res.json();
		const parsedError = signupErrorResponseSchema.parse(errorData)
    throw new Error( parsedError.error || 'Signup failed');
  }

	const data = await res.json();

  return SignupAPISuccessSchema.parse(data);
}



const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<SignupSuccessResponse, Error, SignupBodyInput>({
    mutationFn: (payload) => signupUser(payload),
    onSuccess: ({user}) => {
      // data.user is typed as { id: string; email: string; username: string }
      queryClient.setQueryData(['user', 'me'], user);
    },
  });
}

export default useSignup;