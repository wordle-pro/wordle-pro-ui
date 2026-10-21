import SignupForm from './SignupForm';
import useSignupForm from './useSignupForm';

const SignupFormContainer = () => {
	const form = useSignupForm();
	
	return (		
		<SignupForm form={form} />
	);
};

export default SignupFormContainer;