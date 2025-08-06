import { createContext } from 'react';
import type { OnboardType } from '../validators/onboard.validator';
import type { UseFormReturn } from 'react-hook-form';

export type FormContextType = UseFormReturn<OnboardType>;

export const FormContext = createContext<FormContextType | null>(null);
