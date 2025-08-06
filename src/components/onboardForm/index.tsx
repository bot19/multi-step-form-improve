import { StepUserDetails } from './StepUserDetails';
import { StepCreatePassword } from './StepCreatePassword';
import { Success } from './Success';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  OnboardSchema,
  type OnboardType,
  BackendSubmissionSchema,
} from '../../validators/onboard.validator';
import { FormProvider } from '../../contexts/FormProvider';
import { api, API_URL_CREATE_USER } from '../../services/api';
import { useState, useEffect } from 'react';
import { useFormPersistence } from '../../hooks/useFormPersistence';
import {
  FORM_STORAGE_KEYS,
  clearAllFormData,
  getMobileNumber,
} from '../../utils/formStorage';
import { hasExpired } from '../../utils/onboardingUtils';
import {
  TOTAL_ONBOARDING_STEPS,
  ERROR_MESSAGES,
  CONFIRM_MESSAGES,
} from '../../constants';

export const OnboardForm = () => {
  const { state, dispatch } = useOnboarding();
  const { currentStep, mobileAuth } = state;
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);

  const formMethods = useForm<OnboardType>({
    resolver: zodResolver(OnboardSchema),
    mode: 'onChange',
    shouldUnregister: false,
    shouldFocusError: false,
  });

  useFormPersistence(formMethods, FORM_STORAGE_KEYS.ONBOARDING);

  // Load mobile number from localStorage when component mounts
  useEffect(() => {
    const mobile = getMobileNumber();
    setMobileNumber(mobile);
  }, []);

  const onSubmit = async (data: OnboardType) => {
    if (!mobileNumber) {
      alert(ERROR_MESSAGES.MOBILE_NOT_FOUND);
      return;
    }

    // Check auth token validity
    if (hasExpired(mobileAuth)) {
      const shouldRestart = confirm(CONFIRM_MESSAGES.EXPIRED_SESSION);
      if (shouldRestart) {
        dispatch({ type: 'GO_TO_STEP', payload: 1 });
      }
      return;
    }

    try {
      // Combine form data with mobile number for backend submission
      const submissionData = {
        ...data,
        mobile: mobileNumber,
      };
      // TODO: don't need pw confirm
      console.log('submissionData', submissionData);

      // Validate data against backend schema
      const validationResult =
        BackendSubmissionSchema.safeParse(submissionData);

      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        const errorMsg = ERROR_MESSAGES.VALIDATION_FAILED(
          firstError?.message ?? 'Invalid data'
        );
        alert(errorMsg);
        return;
      }

      // Send to API
      const response = await api.post(
        API_URL_CREATE_USER,
        JSON.stringify(validationResult.data)
      );

      if (response.success) {
        console.log('User created successfully:', response.response);
        clearAllFormData(); // Clear all form data on successful acc creation
        dispatch({ type: 'NEXT_STEP' });
      } else {
        const errorMsg =
          response.error ?? ERROR_MESSAGES.ACCOUNT_CREATION_FAILED;
        alert(errorMsg);
      }
    } catch {
      alert(ERROR_MESSAGES.UNEXPECTED_ERROR);
    }
  };

  return (
    <FormProvider value={formMethods}>
      <form
        onSubmit={e => {
          e.preventDefault();
          void formMethods.handleSubmit(onSubmit)(e);
        }}
      >
        {currentStep === 2 && <StepUserDetails />}
        {currentStep === 3 && <StepCreatePassword />}
      </form>
      {currentStep === TOTAL_ONBOARDING_STEPS && <Success />}
    </FormProvider>
  );
};
