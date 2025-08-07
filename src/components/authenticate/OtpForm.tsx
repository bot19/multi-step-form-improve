import { Button, InputBasic } from '../../ui';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MobileOtpSchema,
  type MobileOtpType,
} from '../../validators/onboard.validator';
import { api, API_URL_VALIDATE_OTP } from '../../services/api';
import { useOnboarding } from '../../hooks/useOnboarding';
import type { IMobileAuth } from '../../types';
import type { AuthFormState } from './types';
import { useFormPersistence } from '../../hooks/useFormPersistence';
import {
  FORM_STORAGE_KEYS,
  getMobileNumber,
  clearFormData,
} from '../../utils/formStorage';
import { useEffect } from 'react';

interface OtpFormProps {
  authFormState: AuthFormState;
}

export const OtpForm = (props: OtpFormProps) => {
  const formMethods = useForm<MobileOtpType>({
    resolver: zodResolver(MobileOtpSchema),
  });

  useFormPersistence(formMethods, FORM_STORAGE_KEYS.OTP);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = formMethods;

  const { dispatch } = useOnboarding();

  // Focus the OTP input when OTP is sent
  useEffect(() => {
    if (props.authFormState === 'otp-sent') {
      const timer = setTimeout(() => {
        setFocus('otp');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [props.authFormState, setFocus]);

  // TODO: long, can abstract?
  const onSubmit: SubmitHandler<MobileOtpType> = async data => {
    try {
      const mobile = getMobileNumber();
      if (!mobile) {
        setError('otp', {
          type: 'server',
          message:
            'Mobile number not found. Please restart the verification process.',
        });
        return;
      }

      const response = await api.post(
        API_URL_VALIDATE_OTP,
        JSON.stringify({ ...data, mobile })
      );
      // TODO: use zod to parse response, ensure type correctness
      const responseJson = JSON.parse(
        response.response ?? '{}'
      ) as IMobileAuth & {
        data: string;
      };
      console.log('OTP validation response', responseJson);

      if (!response.success) {
        setError('otp', {
          type: 'server',
          message: response.error,
        });
        return;
      }

      // Atomic update - both auth and step change together
      dispatch({
        type: 'VERIFY_MOBILE_AUTH',
        payload: {
          auth: {
            expires: responseJson.expires,
            bearer: responseJson.bearer,
          },
          nextStep: 2,
        },
      });

      // Clear OTP form data after successful verification
      clearFormData(FORM_STORAGE_KEYS.OTP);
    } catch (error) {
      setError('otp', {
        type: 'server',
        message: `Network error. Please try again (${error?.toString()})`,
      });
    }
  };

  return (
    <form onSubmit={e => void handleSubmit(onSubmit)(e)} className="space-y-6">
      <InputBasic
        autoComplete="one-time-code"
        label="OTP code"
        placeholder="Enter OTP code"
        type="number"
        disabled={props.authFormState === 'mobile-invalid'}
        error={errors.otp}
        {...register('otp')}
      />

      <Button
        colour="primary"
        type="submit"
        text={isSubmitting ? 'Loading...' : 'Verify'}
        disabled={isSubmitting || props.authFormState === 'mobile-invalid'}
      />
    </form>
  );
};
