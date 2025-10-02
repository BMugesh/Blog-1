/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns boolean - True if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validates a phone number (supports international formats)
 * @param phone - The phone number to validate
 * @returns boolean - True if phone number is valid, false otherwise
 */
export const validatePhone = (phone: string): boolean => {
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  return re.test(phone);
};

/**
 * Formats form data for submission
 * @param formData - The form data to format
 * @returns FormData - Formatted FormData object
 */
export const formatFormData = (formData: Record<string, any>): FormData => {
  const data = new FormData();
  
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        data.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(item => data.append(`${key}[]`, item));
      } else if (typeof value === 'object') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, String(value));
      }
    }
  });
  
  return data;
};

/**
 * Handles form submission to a specified endpoint
 * @param url - The API endpoint URL
 * @param formData - The form data to submit
 * @param options - Additional fetch options
 * @returns Promise with the response data
 */
export const submitForm = async (
  url: string, 
  formData: Record<string, any>, 
  options: RequestInit = {}
): Promise<any> => {
  const defaultOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit form');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
};

/**
 * Handles file uploads
 * @param file - The file to upload
 * @param uploadUrl - The upload endpoint URL
 * @param fieldName - The form field name (default: 'file')
 * @returns Promise with the upload response
 */
export const uploadFile = async (
  file: File, 
  uploadUrl: string, 
  fieldName: string = 'file'
): Promise<any> => {
  const formData = new FormData();
  formData.append(fieldName, file);
  
  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('File upload failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

/**
 * Creates a form validator with custom validation rules
 * @param rules - Object with field names and their validation functions
 * @returns A validation function that can be used with form state
 */
export const createValidator = <T extends Record<string, any>>(
  rules: {
    [K in keyof T]: (value: T[K], values: T) => string | undefined;
  }
) => {
  return (values: T): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    
    (Object.keys(rules) as Array<keyof T>).forEach((field) => {
      const validator = rules[field];
      const error = validator(values[field], values);
      
      if (error) {
        errors[field] = error;
      }
    });
    
    return errors;
  };
};
