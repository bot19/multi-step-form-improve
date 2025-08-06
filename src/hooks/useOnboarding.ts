import { use } from 'react';
import {
  OnboardingContext,
  type OnboardingContextType,
} from '../contexts/OnboardingContext';

export const useOnboarding = (): OnboardingContextType => {
  const context = use(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
