import { ProgressIndicator, Card } from '../../ui';
import { useEffect, useState } from 'react';
import { MobileNumberForm } from './MobileNumberForm';
import { OtpForm } from './OtpForm';
import type { AuthFormState } from './types';

const RESEND_CODE_WAIT_TIME = 15000;

// TODO: fix input-button thin border (right)
// TODO: input regex number only, better than type="number", as up/down value
export const StepOneAuth = () => {
  const [authFormState, setAuthFormState] =
    useState<AuthFormState>('mobile-invalid');

  useEffect(() => {
    if (authFormState === 'otp-sent') {
      setTimeout(() => {
        setAuthFormState('otp-retry');
      }, RESEND_CODE_WAIT_TIME);
    }
  }, [authFormState]);

  return (
    <Card stepKey="step-1" title="Mobile verification">
      <div className="mb-8 flex justify-center">
        <ProgressIndicator step={1} />
      </div>

      <div className="space-y-6">
        <MobileNumberForm
          authFormState={authFormState}
          onSuccess={() => setAuthFormState('otp-sent')}
        />

        <OtpForm authFormState={authFormState} />
      </div>
    </Card>
  );
};
