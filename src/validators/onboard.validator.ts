import { z } from 'zod';
import { DATE_OF_BIRTH_MIN, DATE_OF_BIRTH_MAX } from '../constants';

// mobile verification;
// TODO: bonus, strict AU mobile validation, eg: +614...
export const MobileNumberSchema = z.object({
  mobile: z
    .string()
    .length(10, 'Mobile number must be exactly 10 digits')
    .regex(/^04/, 'Mobile number must start with 04'),
});
export type MobileNumberType = z.infer<typeof MobileNumberSchema>;

export const MobileOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});
export type MobileOtpType = z.infer<typeof MobileOtpSchema>;

// personal details
export const UserDetailsSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(128, 'Full name must be less than 128 characters'),
  email: z.email({ message: 'Please enter a valid email address' }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date')
    .refine(
      date => {
        const selectedDate = new Date(date);
        const minDate = new Date(DATE_OF_BIRTH_MIN);
        const maxDate = new Date(DATE_OF_BIRTH_MAX);
        return selectedDate >= minDate && selectedDate <= maxDate;
      },
      {
        message: `Date of birth must be between ${DATE_OF_BIRTH_MIN.split('-')[0]} and ${DATE_OF_BIRTH_MAX.split('-')[0]}`,
      }
    ),
  gender: z.string().optional(),
});
export type UserDetailsType = z.infer<typeof UserDetailsSchema>;

// password validation rules
const PasswordValidationSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character'
  );

// password with confirmation
export const CreatePasswordSchema = z
  .object({
    password: PasswordValidationSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const OnboardSchema = z.intersection(
  UserDetailsSchema,
  CreatePasswordSchema
);

export type OnboardType = z.infer<typeof OnboardSchema>;

// Backend submission schema - combines mobile, user details, and password
export const BackendSubmissionSchema = z.intersection(
  z.intersection(MobileNumberSchema, UserDetailsSchema),
  z.object({
    password: PasswordValidationSchema,
  })
);

export type BackendSubmissionType = z.infer<typeof BackendSubmissionSchema>;
