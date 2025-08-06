import { Button, InputBasic } from '../../ui';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MobileNumberSchema,
  type MobileNumberType,
} from '../../validators/onboard.validator';
import { api, API_URL_SEND_OTP } from '../../services/api';
import type { AuthFormState } from './types';
import { useFormPersistence } from '../../hooks/useFormPersistence';
import { FORM_STORAGE_KEYS } from '../../utils/formStorage';
import { useEffect } from 'react';

interface MobileNumberFormProps {
  authFormState: AuthFormState;
  onSuccess: () => void;
}

export const MobileNumberForm = (props: MobileNumberFormProps) => {
  const formMethods = useForm<MobileNumberType>({
    resolver: zodResolver(MobileNumberSchema),
  });

  useFormPersistence(formMethods, FORM_STORAGE_KEYS.MOBILE_NUMBER);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = formMethods;

  // Focus the mobile input when component mounts
  useEffect(() => {
    // Use a longer delay to ensure everything is ready
    const timer = setTimeout(() => {
      setFocus('mobile'); // TODO: better way to focus?
    }, 100);

    return () => clearTimeout(timer);
  }, [setFocus]);

  const onSubmit: SubmitHandler<MobileNumberType> = async data => {
    console.log('MobileNumberForm onSubmit', data);
    try {
      const response = await api.post(API_URL_SEND_OTP, JSON.stringify(data));

      if (!response.success) {
        setError('mobile', {
          type: 'server',
          message: response.error,
        });
        return;
      }

      props.onSuccess();
    } catch {
      setError('mobile', {
        type: 'server',
        message: 'Network error. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={e => void handleSubmit(onSubmit)(e)} className="space-y-6">
      <InputBasic
        autoComplete="tel"
        label="Mobile number"
        placeholder="Enter mobile number"
        type="number"
        disabled={isSubmitting || props.authFormState === 'otp-sent'}
        error={errors.mobile}
        {...register('mobile')}
      />

      <Button
        colour="primary"
        type="submit"
        text={
          isSubmitting
            ? 'Loading...'
            : props.authFormState === 'otp-sent'
              ? 'Resend code (wait 15s)'
              : 'Get code'
        }
        disabled={isSubmitting || props.authFormState === 'otp-sent'}
      />
    </form>
  );
};
