import type { IMobileAuth } from '../types';
import { TOTAL_ONBOARDING_STEPS } from '../constants';

export interface OnboardingState {
  currentStep: number;
  mobileAuth: IMobileAuth | null;
}

export type OnboardingAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'SET_MOBILE_AUTH'; payload: IMobileAuth | null }
  | {
      type: 'VERIFY_MOBILE_AUTH';
      payload: { auth: IMobileAuth; nextStep: number };
    }
  | { type: 'RESET_TO_STEP_1' };

export const onboardingReducer = (
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, TOTAL_ONBOARDING_STEPS),
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(
          1,
          Math.min(action.payload, TOTAL_ONBOARDING_STEPS)
        ),
      };

    case 'SET_MOBILE_AUTH':
      return {
        ...state,
        mobileAuth: action.payload,
      };

    case 'VERIFY_MOBILE_AUTH':
      return {
        ...state,
        mobileAuth: action.payload.auth,
        currentStep: action.payload.nextStep,
      };

    case 'RESET_TO_STEP_1':
      return {
        ...state,
        currentStep: 1,
        mobileAuth: null,
      };

    default:
      return state;
  }
};
