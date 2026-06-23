import { useId, type ReactNode, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/shared/utils/cn';

/* ───────── Shared Base Props (common to input + textarea) ─────────
   NOTE: labelClassName lives HERE so it is visible on the union type
   itself, NOT only on one branch. This is the correct TS pattern for
   discriminated unions — anything you want to pass for both variants
   must live on the shared base, not on the discriminated branch. */
type BaseProps = {
  label?: string;
  error?: string;
  icon?: ReactNode;
  register?: UseFormRegisterReturn;
  /** Optional explicit id; if omitted a stable useId() is generated. */
  id?: string;
  /** Override or extend the label's className (e.g. "text-white" on dark backgrounds). */
  labelClassName?: string;
};

type InputAsInput = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'error' | 'id'> & {
    as?: 'input';
  };

type InputAsTextarea = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'label' | 'error' | 'id'> & {
    as: 'textarea';
  };

type FormFieldProps = InputAsInput | InputAsTextarea;

export function FormField({
  label,
  error,
  icon,
  register,
  id: explicitId,
  className = '',
  labelClassName = '',
  as,
  ...props
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = explicitId || `field-${autoId}`;
  const errorId = `${fieldId}-error`;

  const inputClasses = cn(
    'w-full rounded-xl border border-coffee-500/30 bg-white/60 p-3 text-sm transition-all',
    'focus:outline-none focus:ring-2 focus:ring-coffee-500/30',
    'placeholder:text-neutral-400',
    icon ? 'pl-11' : 'px-4',
    error && 'border-red-500 ring-1 ring-red-500',
    className
  );

  return (
    <div className="space-y-2 text-left">
      {label && (
        <label
          htmlFor={fieldId}
          className={cn(
            'block text-sm font-semibold text-coffee-900 mb-1',
            labelClassName
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-500/50" aria-hidden="true">
            {icon}
          </div>
        )}

        {as === 'textarea' ? (
          <textarea
            id={fieldId}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...register}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(inputClasses, 'min-h-[100px] resize-y')}
          />
        ) : (
          <input
            id={fieldId}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            {...register}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={inputClasses}
          />
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-[11px] text-red-600 mt-1 font-medium italic">
          {error}
        </p>
      )}
    </div>
  );
}