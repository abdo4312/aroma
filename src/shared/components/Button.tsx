import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

/* ───────── Types ───────── */

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'gradient';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /** When true, the button takes the full width of its container. */
    fullWidth?: boolean;
}

/* ───────── Variant Styles ───────── */

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-[#5d3a27] text-[#fff8f1] hover:bg-[#4a2e1f] hover:shadow-[0_10px_25px_-8px_rgba(54,31,21,0.7)]',
    secondary:
        'border border-white/60 bg-white/35 text-[#4a2e1f] backdrop-blur-md hover:bg-white/55',
    outline:
        'border border-[#8c6239]/25 bg-white/25 text-[#5f3a26] backdrop-blur-md hover:bg-[#8c6239]/8',
    ghost:
        'text-[#5f3a26] hover:bg-[#8c6239]/8',
    danger:
        'bg-[#EF4444] text-white hover:bg-red-600 hover:shadow-[0_10px_25px_-8px_rgba(239,68,68,0.6)]',
    gradient:
        'bg-gradient-to-r from-[#8C6239] to-[#5F3A26] text-white font-bold hover:shadow-[0_10px_30px_-8px_rgba(95,58,38,0.8)]',
};

/* ───────── Size Styles ───────── */

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3 text-sm rounded-xl gap-2',
    xl: 'w-full py-4 text-lg rounded-2xl gap-2',
};

/* ───────── Component ───────── */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            className,
            children,
            type = 'button',
            'aria-label': ariaLabel,
            ...rest
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                aria-label={ariaLabel}
                aria-busy={isLoading || undefined}
                className={cn(
                    'inline-flex items-center justify-center font-semibold',
                    'transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8c6239]/40',
                    'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100',
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth && 'w-full',
                    className
                )}
                {...rest}
            >
                {isLoading && (
                    <Loader2
                        className={cn(
                            'animate-spin',
                            size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5'
                        )}
                        aria-hidden="true"
                    />
                )}
                {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
                {children && (
                    <span aria-live={isLoading ? 'polite' : undefined}>{children}</span>
                )}
                {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = 'Button';