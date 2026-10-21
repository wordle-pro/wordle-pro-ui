import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import  clsx from 'clsx';
import { cva } from 'class-variance-authority';
import cn from '@/common/utils/cn';

type IconProps<Side extends 'left' | 'right'> = 
	| (Record<`${Side}IconName`, IconName> & 
		 Record<`on${Capitalize<Side>}IconClick`, React.MouseEventHandler<HTMLElement>> & 
		 Record<`${Side}AriaLabel`, string>)
	| (Record<`${Side}IconName`, IconName> & 
		 Partial<Record<`on${Capitalize<Side>}IconClick`, never>> & 
		 Partial<Record<`${Side}AriaLabel`, never>>)
	| (Partial<Record<`${Side}IconName`, never>> & 
		 Partial<Record<`on${Capitalize<Side>}IconClick`, never>> & 
		 Partial<Record<`${Side}AriaLabel`, never>>);

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	type: 'email' | 'password' | 'search' | 'text' | 'url',
	name: string,
	label: string,
	labelPos?: 'top' | 'right' | 'left' | 'hidden',
	id?: string,
	errorMsg?: string  
} & IconProps<'left'> & IconProps<'right'>

const INPUT_BASE_CLASSES = clsx(
	// Layout & Typography
	'w-full text-base py-3 rounded-md outline-none transition-all',
	'text-white caret-white placeholder:text-gray-500',
	
	// Border States (Normal)
	'border border-zinc-700',
	
	// Border States (Interactive)
	'focus:border-white focus:ring-1 focus:ring-white',
	'active:border-white focus-within:border-white'
);

const labelPosVariants = cva('flex', {
	variants: {
		labelPos: {
			top: 'flex-col gap-1.5',
			left: 'flex-row items-center gap-4',
			hidden: 'flex-col',
			right: 'flex-row-reverse items-center gap-4'
		},
	},
	defaultVariants: {
		labelPos: 'top',
	},
});

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	({
		id,
		label,
		labelPos,
		leftIconName, 
		rightIconName, 
		onLeftIconClick, 
		onRightIconClick, 
		leftAriaLabel, 
		rightAriaLabel,
		errorMsg,
		...props 
	}, ref) => {
		const baseIconClassNames = clsx(
			'absolute', 
			'top-1/2', 
			'-translate-y-1/2',
			'text-white'
		);

		const leftIconClassNames = clsx(
			baseIconClassNames,
			'left-4', 
			onLeftIconClick && 'hover:text-gray-300'
		)

		const rightIconClassNames = clsx(
			baseIconClassNames,
			'right-4', 
			onRightIconClick && 'hover:text-gray-300'
		);    

	const inputClassNames = clsx(
		INPUT_BASE_CLASSES,
		leftIconName ? 'pl-12' : 'pl-4',
		rightIconName ? 'pr-12' : 'pr-4',
	);

		const isLeftIconButton = typeof onLeftIconClick === 'function';
		const isRightIconButton = typeof onRightIconClick === 'function';

		const LeftWrapper = isLeftIconButton ? 'button' : 'span';
		const leftWrapperProps = isLeftIconButton
			? { 
					type: 'button' as const, 
					onClick: onLeftIconClick 
				}
			: {};

		const RightWrapper = isRightIconButton ? 'button' : 'span';
		const rightWrapperProps = isRightIconButton
			? {
				type: 'button' as const, 
				onClick: onRightIconClick
			}
			: {}

		const labelClassNames = clsx(
			'text-white',
			'w-fit',
			'whitespace-nowrap',
			labelPos === 'hidden' ? 'sr-only' : 'text-sm',
		);

		const containerClassnames = cn(
			'w-full',
			labelPosVariants({labelPos})
		);

		const reactId = useId();
		const fieldId = id ?? reactId;
		
		
		return (
			<div className={containerClassnames}>
				<label htmlFor={fieldId} className={labelClassNames}>{label}</label>
				<div className="relative w-full">
					{leftIconName && (
						<LeftWrapper className={leftIconClassNames} aria-label={leftAriaLabel} {...leftWrapperProps}>
							<DynamicIcon name={leftIconName} size={24} />          
						</LeftWrapper>
					)}

					<input
						{...props}
						name={label}
						id={fieldId}
						className={inputClassNames}
						ref={ref}            
					/>

					{rightIconName && (
						<RightWrapper className={rightIconClassNames} aria-label={rightAriaLabel} {...rightWrapperProps}>
							<DynamicIcon name={rightIconName} size={24} />
						</RightWrapper>
					)}
				</div>
				{errorMsg && (
        <p className="text-xs text-red-600 font-medium">
          {errorMsg}
        </p>
      )}
			</div>
		)
	}
)

TextInput.displayName = 'TextInput';

export default TextInput;