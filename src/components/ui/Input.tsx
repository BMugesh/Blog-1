import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'outline' | 'filled' | 'flushed';

type BaseInputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
};

type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { as?: 'textarea' };

type Props = InputProps | TextareaProps;

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const variantClasses: Record<InputVariant, string> = {
  default: 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
  outline: 'bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent',
  filled: 'bg-gray-50 dark:bg-gray-800 border border-transparent focus:ring-2 focus:ring-primary-500',
  flushed: 'bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:ring-0 focus:border-primary-500',
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      size = 'md',
      variant = 'default',
      fullWidth = false,
      className = '',
      containerClassName = '',
      labelClassName = '',
      inputClassName = '',
      errorClassName = '',
      helperTextClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const isTextarea = 'as' in props && props.as === 'textarea';
    
    const inputClasses = twMerge(
      'block w-full rounded-md shadow-sm transition-colors duration-200 focus:outline-none',
      sizeClasses[size],
      variantClasses[variant],
      error ? 'border-red-500 focus:ring-red-500' : '',
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      isTextarea ? 'min-h-[100px]' : '',
      inputClassName,
      className
    );

    const containerClasses = twMerge(
      'space-y-1',
      fullWidth ? 'w-full' : 'w-auto',
      containerClassName
    );

    const labelClasses = twMerge(
      'block text-sm font-medium text-gray-700 dark:text-gray-300',
      labelClassName
    );

    const errorClasses = twMerge(
      'text-sm text-red-600 dark:text-red-400',
      errorClassName
    );

    const helperTextClasses = twMerge(
      'text-sm text-gray-500 dark:text-gray-400',
      helperTextClassName
    );

    const renderInput = () => (
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">
              {leftIcon}
            </span>
          </div>
        )}
        
        {isTextarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={inputClasses}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            className={inputClasses}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
    );

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {renderInput()}
        
        {error ? (
          <p className={errorClasses}>{error}</p>
        ) : helperText ? (
          <p className={helperTextClasses}>{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
