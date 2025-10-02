import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { validateEmail } from '../utils/formUtils';

type FormField = {
  value: string;
  error?: string;
  required?: boolean;
  validate?: (value: string) => string | undefined;
};

type FormFields<T extends string> = Record<T, FormField>;

type UseFormReturn<T extends string> = {
  formData: FormFields<T>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => boolean;
  setFieldValue: (field: T, value: string) => void;
  setFieldError: (field: T, error: string) => void;
  resetForm: () => void;
  isSubmitting: boolean;
  isValid: boolean;
};

/**
 * Custom hook for form handling with validation
 * @param initialForm - Initial form state
 * @param onSubmit - Callback function when form is submitted
 * @returns Form handling utilities and state
 */
const useForm = <T extends string>(
  initialForm: FormFields<T>,
  onSubmit: (formData: Record<T, string>) => Promise<void> | void
): UseFormReturn<T> => {
  const [formData, setFormData] = useState<FormFields<T>>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback((name: T, value: string): string | undefined => {
    const field = formData[name];
    
    // Check required field
    if (field.required && !value.trim()) {
      return 'This field is required';
    }

    // Check email format if field is email
    if (name.toLowerCase().includes('email') && value && !validateEmail(value)) {
      return 'Please enter a valid email address';
    }

    // Run custom validation if provided
    if (field.validate) {
      return field.validate(value);
    }

    return undefined;
  }, [formData]);

  // Handle form field changes
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;
      
      // Handle checkbox and radio inputs
      const fieldValue = type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value;

      setFormData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as T],
          value: fieldValue,
          error: validateField(name as T, String(fieldValue)),
        },
      }));
    },
    [validateField]
  );

  // Set field value programmatically
  const setFieldValue = useCallback((field: T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: validateField(field, value),
      },
    }));
  }, [validateField]);

  // Set field error programmatically
  const setFieldError = useCallback((field: T, error: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error,
      },
    }));
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialForm);
  }, [initialForm]);

  // Check if form is valid
  const isValid = useCallback(() => {
    return !Object.keys(formData).some(
      (key) => formData[key as T].error || (formData[key as T].required && !formData[key as T].value.trim())
    );
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      
      // Validate all fields
      const newFormData = { ...formData };
      let hasErrors = false;

      Object.keys(formData).forEach((key) => {
        const field = formData[key as T];
        const error = validateField(key as T, field.value);
        
        if (error) {
          newFormData[key as T] = { ...field, error };
          hasErrors = true;
        }
      });

      setFormData(newFormData);

      if (hasErrors || !isValid()) {
        return false;
      }

      try {
        setIsSubmitting(true);
        
        // Extract values from form data
        const formValues = Object.keys(formData).reduce((acc, key) => {
          acc[key as T] = formData[key as T].value;
          return acc;
        }, {} as Record<T, string>);

        await onSubmit(formValues);
        return true;
      } catch (error) {
        console.error('Form submission error:', error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, isValid, onSubmit, validateField]
  );

  return {
    formData,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    isSubmitting,
    isValid: isValid(),
  };
};

export default useForm;
