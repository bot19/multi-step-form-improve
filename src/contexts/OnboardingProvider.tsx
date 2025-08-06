import { useReducer, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { onboardingReducer, type OnboardingState } from './onboardingReducer';
import {
  OnboardingContext,
  type OnboardingContextType,
} from './OnboardingContext';

interface OnboardingProviderProps {
  children: ReactNode;
  initialStep?: number;
}

const ONBOARDING_STATE_KEY = 'onboarding-state';

// Load initial state from localStorage
const getInitialState = (initialStep: number): OnboardingState => {
  const savedState = localStorage.getItem(ONBOARDING_STATE_KEY);
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState) as OnboardingState;

      // Check if mobile auth has expired
      if (
        parsedState.mobileAuth &&
        Date.now() > parsedState.mobileAuth.expires
      ) {
        // Auth expired, clean up localStorage and fall back to initial values
        localStorage.removeItem(ONBOARDING_STATE_KEY);
        return { currentStep: initialStep, mobileAuth: null };
      }

      return parsedState;
    } catch (error) {
      console.warn('Failed to parse saved onboarding state:', error);
      localStorage.removeItem(ONBOARDING_STATE_KEY);
    }
  }
  return { currentStep: initialStep, mobileAuth: null };
};

export const OnboardingProvider = ({
  children,
  initialStep = 1,
}: OnboardingProviderProps) => {
  const [state, dispatch] = useReducer(
    onboardingReducer,
    getInitialState(initialStep)
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(ONBOARDING_STATE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<OnboardingContextType>(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return <OnboardingContext value={value}>{children}</OnboardingContext>;
};
