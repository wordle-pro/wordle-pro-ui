import useSignup from '@/common/hooks/useSignup';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { z } from 'zod';

const signupSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: 'Username must be at least 3 characters' })
			.max(20, { message: 'Keep it under 20 characters for the leaderboard' })
			.regex(/^[a-zA-Z0-9_-]+$/, { message: 'Only letters, numbers, and underscores allowed' }),
		email: z.email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' })
			.regex(/^(?=.*[A-Z])(?=.*[0-9]).*$/, {
				message: 'Password must include at least 1 uppercase letter and 1 number',
			}),
		confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
	})
	.refine((data) => {    
		return data.password === data.confirmPassword;
	}, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

const useSignupForm = () => {
	const signupMutation = useSignup();
	const navigate = useNavigate({ from: '/signup' })
	
	const form = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validators: {
			onBlur: signupSchema,      
		},
		onSubmit: async ({ value, formApi }) => {
			const { confirmPassword, ...signupPayload } = value;

			try {
				formApi.setErrorMap({ onSubmit: undefined });
				const response = await signupMutation.mutateAsync(signupPayload);
				 
				if (response.user.id === undefined) {
					throw new Error('Signup failed');                    
				}
				console.log('sign up success');
				navigate({ to: '/' });
		
			} catch (err: unknown) {
				
				const errorMessage = err instanceof Error ? err.message :  'An unexpected error occurred';
					 formApi.setErrorMap({
						onSubmit: {
							form: errorMessage,
							fields: {}, 
						},
					});
			}
		}
	});
	
	return form;
};

export default useSignupForm;

export type SignupFormType = ReturnType<typeof useSignupForm>;