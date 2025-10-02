import type { FormHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  fullWidth?: boolean;
  title?: string;
  description?: string;
  footer?: ReactNode;
};

/**
 * A flexible form component with consistent styling and layout
 */
const Form = ({
  children,
  className = '',
  onSubmit,
  fullWidth = false,
  title,
  description,
  footer,
  ...props
}: FormProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(e);
    }
  };

  return (
    <div className={twMerge('w-full', fullWidth ? 'max-w-full' : 'max-w-2xl', className)}>
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6" {...props}>
        <div className="space-y-6">
          {children}
        </div>
        
        {footer && (
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {footer}
          </div>
        )}
      </form>
    </div>
  );
};

type FormGroupProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  description?: string;
};

/**
 * A form group component for consistent form field spacing and layout
 */
const FormGroup = ({
  children,
  className = '',
  label,
  htmlFor,
  required,
  error,
  description,
}: FormGroupProps) => (
  <div className={twMerge('space-y-2', className)}>
    {label && (
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    
    {children}
    
    {error ? (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
    ) : description ? (
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    ) : null}
  </div>
);

/**
 * A form actions component for form buttons
 */
type FormActionsProps = {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between' | 'around' | 'evenly';
};

const FormActions = ({
  children,
  className = '',
  align = 'right',
}: FormActionsProps) => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };
  
  return (
    <div className={twMerge(
      'flex flex-wrap gap-3 mt-8',
      alignmentClasses[align],
      className
    )}>
      {children}
    </div>
  );
};

// Attach sub-components to Form for better API
Form.Group = FormGroup;
Form.Actions = FormActions;

export default Form;
