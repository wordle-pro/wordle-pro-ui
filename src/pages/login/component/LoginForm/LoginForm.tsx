import { Link } from '@tanstack/react-router';
import Button from '@/common/ui/Button';
import Card from '@/common/ui/Card';
import TextInput from '@/common/ui/TextInput';
import type { LoginFormType } from './useLoginForm';
import { useState } from 'react';

type LoginFormProp = {
	form: LoginFormType
};

const LoginForm = ({ form }: LoginFormProp) => {
	const {
		Field,		
		Subscribe,
		handleSubmit
	} = form;

	const [hidePassword, setHidePassword] = useState(true);
	
	return (
		<Card>
			<form
				onSubmit={(e) => {
        	e.preventDefault();
        	e.stopPropagation();
        	handleSubmit();
      	}}				
			>
			<div className="gap-6 mb-6 flex flex-col">
			<Field
        name="email"
        children={(field) => (					        
					<TextInput 
						type="email" 
						name="email" 
						label="Email" 
						placeholder="Enter your email"
						value={field.state.value}							
						onChange={(e) => {
							field.handleChange(e.target.value);
						}}							
					/>          
        )}
      />
			<Field
        name="password"
        children={(field) => (	
						<TextInput 
							type={hidePassword ? 'password' : 'text'} 
							name="password" 
							label="Password" 
							placeholder="Enter your password" 
							rightAriaLabel={hidePassword ? 'Show password' : 'Hide password'}
							rightIconName={hidePassword ? 'eye' : 'eye-off'}							
							onRightIconClick={() => setHidePassword(!hidePassword)}
							value={field.state.value}							
							onChange={(e) => {
								field.handleChange(e.target.value);
							}}							
						/>
				)} />				

				{/* <Link className="inline-block w-fit" to="/forgot-password"><span className="text-correct text-sm inline-block">Forget password?</span></Link> */}
				<Subscribe 
				  selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => {
						return ( 
								<Button
									disabled={!canSubmit}
									isLoading={isSubmitting}
									type="submit"
								>Sign In</Button>
							);
					}} />								
			</div>
			
			</form>
			<div className="text-gray-400 text-sm text-center">Don't have an account? <Link to="/signup"><span className="text-correct text-sm inline-block">Create account</span></Link></div>
		</Card>
	);
};

export default LoginForm;