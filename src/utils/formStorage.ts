// Form storage keys for different forms
export const FORM_STORAGE_KEYS = {
  MOBILE_NUMBER: 'mobile-number-form',
  OTP: 'otp-form',
  ONBOARDING: 'onboarding-form-data',
  ONBOARDING_STATE: 'onboarding-state',
} as const;

// Utility to clear all form data (but not onboarding state)
export const clearAllFormData = () => {
  const formKeys = [
    FORM_STORAGE_KEYS.MOBILE_NUMBER,
    FORM_STORAGE_KEYS.OTP,
    FORM_STORAGE_KEYS.ONBOARDING,
  ];

  formKeys.forEach(key => {
    localStorage.removeItem(key);
  });
};

// Utility to get all saved form data
export const getAllFormData = () => {
  const data: Record<string, unknown> = {};
  Object.entries(FORM_STORAGE_KEYS).forEach(([name, key]) => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        data[name] = JSON.parse(saved);
      } catch {
        // Ignore corrupted data
      }
    }
  });
  return data;
};

// Utility to get specific form data from localStorage
export const getFormData = <T>(key: string): T | null => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved) as T;
    } catch {
      console.warn('Failed to parse saved form data for key:', key);
      return null;
    }
  }
  return null;
};

// Utility to get mobile number from localStorage
export const getMobileNumber = (): string | null => {
  const mobileData = getFormData<{ mobile: string }>(
    FORM_STORAGE_KEYS.MOBILE_NUMBER
  );
  return mobileData?.mobile ?? null;
};

// Utility to clear specific form data
export const clearFormData = (key: string) => {
  localStorage.removeItem(key);
};
