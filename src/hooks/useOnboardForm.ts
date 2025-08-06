import { use } from 'react';
import { FormContext } from '../contexts/FormContext';
import type { FormContextType } from '../contexts/FormContext';

// avoid useForm as matches default RHF hook name
export const useOnboardForm = (): FormContextType => {
  const context = use(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
