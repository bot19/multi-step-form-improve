import { type ReactNode } from 'react';
import { FormContext } from './FormContext';
import type { FormContextType } from './FormContext';

interface FormProviderProps {
  children: ReactNode;
  value: FormContextType;
}

export const FormProvider = ({ children, value }: FormProviderProps) => (
  <FormContext value={value}>{children}</FormContext>
);

export { FormContext };
