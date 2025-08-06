import {
  Button,
  InputBasic,
  InputSelect,
  ProgressIndicator,
  Card,
} from '../../ui';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useOnboardForm } from '../../hooks/useOnboardForm';
import { useEffect } from 'react';
import { DATE_OF_BIRTH_MIN, DATE_OF_BIRTH_MAX } from '../../constants';

const CONFIRM_MESSAGES = {
  GO_BACK_VERIFICATION:
    'Going back to mobile verification will require you to verify again before proceeding. Are you sure?',
} as const;

export const StepUserDetails = () => {
  const { state, dispatch } = useOnboarding();
  const { currentStep } = state;
  const {
    register,
    trigger,
    setFocus,
    formState: { errors },
  } = useOnboardForm();

  // Focus the Full Name input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus('fullName');
    }, 100);

    return () => clearTimeout(timer);
  }, [setFocus]);

  return (
    <Card stepKey="step-2" title="Sign in to your account">
      <div className="mb-8 flex justify-center">
        <ProgressIndicator step={currentStep} />
      </div>

      <div className="space-y-6">
        <InputBasic
          autoComplete="name"
          label="Full name"
          requiredLabel
          placeholder="Enter full name"
          type="text"
          error={errors.fullName}
          {...register('fullName')}
        />

        <InputBasic
          autoComplete="email"
          label="Email"
          requiredLabel
          placeholder="you@example.com"
          type="email"
          error={errors.email}
          {...register('email')}
        />

        <InputBasic
          autoComplete="bday"
          label="Date of birth"
          requiredLabel
          type="date"
          min={DATE_OF_BIRTH_MIN}
          max={DATE_OF_BIRTH_MAX}
          error={errors.dateOfBirth}
          {...register('dateOfBirth')}
        />

        <InputSelect
          autoComplete="gender"
          label="Gender"
          options={[
            { value: '', label: 'Prefer not to say' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          error={errors.gender}
          {...register('gender')}
        />

        <div className="grid grid-cols-4 gap-4">
          <Button
            colour="light"
            text="Back"
            type="button"
            onClick={() => {
              const shouldGoBack = confirm(
                CONFIRM_MESSAGES.GO_BACK_VERIFICATION
              );
              if (shouldGoBack) {
                dispatch({ type: 'RESET_TO_STEP_1' });
              }
            }}
          />

          <div className="col-span-3">
            <Button
              colour="primary"
              text="Next"
              type="button"
              onClick={() => {
                void trigger([
                  'fullName',
                  'email',
                  'dateOfBirth',
                  'gender',
                ]).then(isValid => {
                  if (isValid) {
                    dispatch({ type: 'NEXT_STEP' });
                  }
                });
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
