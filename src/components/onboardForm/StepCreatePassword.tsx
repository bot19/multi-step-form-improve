import { EyeIcon } from '@heroicons/react/16/solid';
import {
  Button,
  Feedback,
  InputBasic,
  PasswordStrengthIndicator,
  ProgressIndicator,
  Card,
} from '../../ui';
import { useOnboarding } from '../../hooks/useOnboarding';
import { useOnboardForm } from '../../hooks/useOnboardForm';
import { useEffect } from 'react';

export const StepCreatePassword = () => {
  const { state, dispatch } = useOnboarding();
  const { currentStep } = state;
  const {
    register,
    trigger,
    setFocus,
    formState: { errors, isSubmitting },
  } = useOnboardForm();

  // Focus the password input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus('password');
    }, 100);

    return () => clearTimeout(timer);
  }, [setFocus]);

  return (
    <Card stepKey="step-3" title="Create your password">
      <div className="mb-8 flex justify-center">
        <ProgressIndicator step={currentStep} />
      </div>

      <div className="space-y-6">
        <Feedback
          title="Password requirements"
          content={[
            'Must be at least 8 characters',
            'Must contain at least one uppercase letter',
            'Must contain at least one lowercase letter',
            'Must contain at least one number',
            'Must contain at least one special character',
          ]}
          type="info"
        />

        <InputBasic
          autoComplete="new-password"
          label="Create your password"
          requiredLabel
          placeholder="Enter password"
          type="password"
          error={errors.password}
          button="Show"
          buttonIcon={
            <EyeIcon
              aria-hidden="true"
              className="-ml-0.5 size-4 text-gray-400"
            />
          }
          {...register('password')}
        />

        <PasswordStrengthIndicator />

        <InputBasic
          autoComplete="confirm-new-password"
          label="Confirm your password"
          requiredLabel
          placeholder="Confirm password"
          type="password"
          error={errors.confirmPassword}
          button="Show"
          buttonIcon={
            <EyeIcon
              aria-hidden="true"
              className="-ml-0.5 size-4 text-gray-400"
            />
          }
          {...register('confirmPassword')}
        />

        <div className="grid grid-cols-4 gap-4">
          <Button
            colour="light"
            text="Back"
            type="button"
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            disabled={isSubmitting}
          />

          <div className="col-span-3">
            <Button
              colour="primary"
              text={isSubmitting ? 'Loading...' : 'Submit'}
              disabled={isSubmitting}
              type="button"
              onClick={() => {
                void trigger(['password', 'confirmPassword']).then(isValid => {
                  if (isValid) {
                    // Trigger the parent form's submit event
                    const form = document.querySelector('form');
                    if (form) {
                      // TODO: better way to submit from here?
                      form.requestSubmit();
                    }
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
