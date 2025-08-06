import { Card, Button } from '../../ui';
import { useOnboarding } from '../../hooks/useOnboarding';
import { TOTAL_ONBOARDING_STEPS } from '../../constants';

export const Success = () => {
  const { dispatch } = useOnboarding();

  const handleGetStarted = () => {
    const confirmed = window.confirm(
      'Onboarding flow has been completed. Return to the beginning?'
    );

    if (confirmed) {
      dispatch({ type: 'RESET_TO_STEP_1' }); // Clear onboarding state when restarting
    }
  };

  return (
    <Card
      stepKey={`step-${TOTAL_ONBOARDING_STEPS}`}
      title="You've been onboarded!"
    >
      <p className="mb-8 text-center">
        Thanks for signing up! You can now use your account to access our
        services.
      </p>
      <Button
        text="Get Started"
        colour="primary"
        type="button"
        onClick={handleGetStarted}
      />
    </Card>
  );
};
