export const API_URL_SEND_OTP = '/auth/sendOTP';
export const API_URL_VALIDATE_OTP = '/auth/validateOTP';
export const API_URL_CREATE_USER = '/auth/createUser';

import { BackendSubmissionSchema } from '../validators/onboard.validator';

const FIFTEEN_MINS_AS_MS = 15 * 60 * 1000; // 15 mins

interface ApiResponse {
  success: boolean;
  response?: string;
  error?: string;
  until?: string;
}

class MockApiService {
  async post(url: string, payload: string): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (url) {
      case API_URL_SEND_OTP: {
        // need to interigate mobile num. to simulate response types
        const { mobile } = JSON.parse(payload) as { mobile?: string };

        if (mobile === '0433222111') {
          return {
            success: false,
            error: 'Mobile already in use',
          } as ApiResponse;
        }

        // simulate network/server error
        if (mobile === '0400000000') {
          return {
            success: false,
            error: 'Issue encountered, please try again later',
          } as ApiResponse;
        }

        return {
          success: true,
          response: '{ "data": "OTP sent successfully" }',
        } as ApiResponse;
      }

      case API_URL_VALIDATE_OTP: {
        const { otp } = JSON.parse(payload) as { otp?: string };

        if (otp === '000000') {
          return { success: false, error: 'Wrong OTP code' } as ApiResponse;
        }

        return {
          success: true,
          response: `{ "data": "OTP validated successfully", "expires": ${Date.now() + FIFTEEN_MINS_AS_MS}, "bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`,
        } as ApiResponse;
      }

      case API_URL_CREATE_USER: {
        try {
          const userData = JSON.parse(payload) as unknown;
          const validationResult = BackendSubmissionSchema.safeParse(userData);

          if (!validationResult.success) {
            const firstError = validationResult.error.issues[0];
            return {
              success: false,
              error: `Validation failed: ${firstError?.message ?? 'Invalid data'}`,
            } as ApiResponse;
          }

          return {
            success: true,
            response: '{ "data": "User created successfully" }',
          } as ApiResponse;
        } catch {
          return {
            success: false,
            error: 'Invalid JSON payload',
          } as ApiResponse;
        }
      }

      default:
        return { success: false, error: 'Route not found' };
    }
  }
}

export const api = new MockApiService();
