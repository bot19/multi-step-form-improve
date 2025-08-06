import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export const useFormPersistence = <T extends Record<string, unknown>>(
  form: UseFormReturn<T>,
  storageKey: string
) => {
  const { watch, reset } = form;

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const subscription = watch(data => {
      if (data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, storageKey]);

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as T;
        reset(parsedData);
      } catch (error) {
        console.warn('Failed to parse saved form data:', error);
        localStorage.removeItem(storageKey);
      }
    }
  }, [reset, storageKey]);

  // Clear saved data function (only needed in specific cases)
  const clearSavedData = () => {
    localStorage.removeItem(storageKey);
  };

  return { clearSavedData };
};
