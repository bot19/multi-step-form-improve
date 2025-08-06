// Date of birth validation range; ~100-10 years old
export const DATE_OF_BIRTH_MIN = '1925-01-01';
export const DATE_OF_BIRTH_MAX = '2015-12-31';

// Onboarding flow configuration
export const TOTAL_ONBOARDING_STEPS = 4;

// Error messages
export const ERROR_MESSAGES = {
  MOBILE_NOT_FOUND:
    'Mobile number not found. Please restart the verification process.',
  VALIDATION_FAILED: (message: string) => `Validation failed: ${message}`,
  ACCOUNT_CREATION_FAILED: 'An error occurred while creating your account',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Confirmation messages
export const CONFIRM_MESSAGES = {
  EXPIRED_SESSION:
    'Your session has expired. Would you like to restart the verification process?',
} as const;
