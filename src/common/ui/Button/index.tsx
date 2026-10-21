import cn from "@/common/utils/cn";
import { cva } from "class-variance-authority";
import { LoaderCircle } from 'lucide-react';

const buttonVariants = cva([
		'text-white',

		'rounded-lg',
    'px-0',
    'w-full',
    'font-semibold', 
    'transition-all',
    'disabled:opacity-50', 
    'py-3',

    // --- Focus Logic ---
    'focus:outline-2',                // Changed from focus-visible
    'focus:outline-offset-2',         // Changed from focus-visible
    'focus:outline-white',        // Changed from focus-visible
    
		// --- Hover Logic ---
    'hover:brightness-125',
	],
	{
		variants: {
			variant: {
				primary: 'bg-correct',
				secondary: 'bg-[#2a2a2b]',
				ghost: 'bg-transparent hover:bg-[#2a2a2b]',
				link: 'rounded-none py-0 w-fit inline-flex'
			},
			size: {
				xs: 'text-xs',
				sm: 'text-sm',
				default: 'text-base',
				large: 'text-lg'
			}
		},
		defaultVariants: {
			variant: 'primary',
      size: 'default',
		}
	},
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	type?: 'button' | 'submit',
	variant?: 'primary' | 'secondary' | 'ghost' | 'link',
	size?: 'xs' | 'sm' | 'default' | 'large',
	isLoading?: boolean,
	disabled?: boolean
}

const Button = ({
	type = 'button',
	variant,
	size,
	children,
	isLoading,
	disabled,
	...props
} : ButtonProps) => {
	const notActionable = isLoading || disabled;

	const className = cn(buttonVariants({variant, size}), notActionable && 'pointer-events-none');

	return (
		<button 
			type={type}
			className={className}
			disabled={notActionable}
			{...props}
		>{ isLoading ? <LoaderCircle className="justify-self-center animate-spin" size={24} /> : children }</button>
	)
}

export default Button;