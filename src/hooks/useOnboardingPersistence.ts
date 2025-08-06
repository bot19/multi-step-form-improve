import { useState, useEffect } from 'react';
import type { IMobileAuth } from '../types';

const ONBOARDING_STATE_KEY = 'onboarding-state';

interface OnboardingState {
  currentStep: number;
  mobileAuth: IMobileAuth | null;
}

export const useOnboardingPersistence = (initialStep = 1) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [mobileAuth, setMobileAuth] = useState<IMobileAuth | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(ONBOARDING_STATE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState) as OnboardingState;

        // Check if mobile auth has expired
        if (
          parsedState.mobileAuth &&
          Date.now() > parsedState.mobileAuth.expires
        ) {
          // Auth expired, reset to step 1
          setCurrentStep(1);
          setMobileAuth(null);
          localStorage.removeItem(ONBOARDING_STATE_KEY);
        } else {
          setCurrentStep(parsedState.currentStep);
          setMobileAuth(parsedState.mobileAuth);
        }
      } catch (error) {
        console.warn('Failed to parse saved onboarding state:', error);
        localStorage.removeItem(ONBOARDING_STATE_KEY);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      const state: OnboardingState = {
        currentStep,
        mobileAuth,
      };
      localStorage.setItem(ONBOARDING_STATE_KEY, JSON.stringify(state));
    }
  }, [currentStep, mobileAuth, isInitialized]);

  // Clear saved state
  const clearSavedState = () => {
    localStorage.removeItem(ONBOARDING_STATE_KEY);
  };

  return {
    currentStep,
    setCurrentStep,
    mobileAuth,
    setMobileAuth,
    isInitialized,
    clearSavedState,
  };
};
