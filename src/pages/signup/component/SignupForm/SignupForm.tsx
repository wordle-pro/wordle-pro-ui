import { useState } from 'react';
import { useStore } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import Button from "@/common/ui/Button";
import Card from "@/common/ui/Card";
import TextInput from "@/common/ui/TextInput";
import	{ type SignupFormType} from './useSignupForm';

type SignupFormProp = {
	form: SignupFormType
};

const SignupForm = ({ form } : SignupFormProp) => {
	const {
		Field,
		handleSubmit,
		Subscribe		
	} = form;
		
	const [hidePassword, setHidePassword] = useState(true);
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
	const { canSubmit, isSubmitting } = useStore(
		form.store,
		(formStore) => {
			const {
				canSubmit, 
				isSubmitting,
				isPristine,
				fieldMeta,
			} = formStore;
			
			const allFieldsBeenTouched = Object.values(fieldMeta).every((fieldIsTouched) => {
				return fieldIsTouched.isTouched;
			});

			return {
				canSubmit: canSubmit && !isPristine && allFieldsBeenTouched,
				isSubmitting,
			};
		},
	);

	
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
						name="username"
						children={(field) => {
							const errorMsg = field.getMeta().errors[0]?.message;
							return (
								<TextInput 
									type="text"
									label="Username"
									name="username"
									placeholder="Choose a username"
									value={field.state.value}
								
									onChange={(e) => {
										field.handleChange(e.target.value);
									}}
									errorMsg={errorMsg}
									onBlur={() => {
										if (field.state.meta.isDirty) {
											field.handleBlur();
										}
									}}								
							/>);
						}}
					/>

					<Field
						name="email"
						children={(field) => {						
							const errorMsg = field.getMeta().errors[0]?.message;
							return (
								<TextInput 
									errorMsg={errorMsg}
									type="email" 
									name="email" 
									label="Email" 
									placeholder="Enter your email"
									value={field.state.value}
									onChange={(e) => {
										field.handleChange(e.target.value);
									}}															
									onBlur={() => {				
										if (field.state.meta.isDirty) {
											field.handleBlur();
										}
									}}								
								/>
							);
						}}
					/>

					<Field
						name="password"
						children={(field) => {						
							const errorMsg = field.getMeta().errors[0]?.message;

							return (
								<TextInput 
									name="password" 
									label="Password" 					
									placeholder="Enter your password" 
									type={hidePassword ? 'password' : 'text'} 
									rightAriaLabel={hidePassword ? 'Show password' : 'Hide password'}
									rightIconName={hidePassword ? 'eye' : 'eye-off'}							
									onRightIconClick={() => setHidePassword(!hidePassword)}
									value={field.state.value}
									onChange={(e) => {
										field.handleChange(e.target.value);
									}}
									onBlur={() => {
										if (field.state.meta.isDirty) {
											field.handleBlur();
										}
									}}
									errorMsg={errorMsg}
								/>
							);
						}}
					/>
					<Field
						name="confirmPassword"
						children={(field) => {					
							const errorMsg = field.getMeta().errors[0]?.message;
							return (
								<TextInput 
									name="confirm-password" 
									label="Confirm Password" 
									placeholder="Confirm your password" 
									type={hideConfirmPassword ? 'password' : 'text'} 
									rightAriaLabel={hideConfirmPassword ? 'Show password' : 'Hide password'}
									rightIconName={hideConfirmPassword ? 'eye' : 'eye-off'}
									onRightIconClick={() => setHideConfirmPassword(!hideConfirmPassword)}
									value={field.state.value}
									onChange={(e) => {
										field.handleChange(e.target.value);
									}}
									errorMsg={errorMsg}
									onBlur={() => {				
										if (field.state.meta.isDirty) {
											field.handleBlur();
										}
									}}								
								/>
							);
						}}
					/>
					<Button
							disabled={!canSubmit}
							isLoading={isSubmitting}
							type="submit"
						>
							Create Account
						</Button>
					<Subscribe 
						selector={(state) => [state.errorMap?.onSubmit]}
					>
						{
							(onSubmitError) => {
								return <p className="text-xs text-red-600 font-medium mb-2">{onSubmitError}</p>
							}
								
						}
					</Subscribe>

				</div>
			</form>
			<div className="text-gray-400 text-sm text-center">Already have an account? <Link to="/login"><span className="text-correct text-sm inline-block">Sign in</span></Link></div>
		</Card>
	);
};

export default SignupForm;