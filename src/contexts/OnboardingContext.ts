import { createContext } from 'react';
import type { OnboardingState, OnboardingAction } from './onboardingReducer';

export interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);
