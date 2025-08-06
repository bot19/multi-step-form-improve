import type { IMobileAuth } from '../types';

export const hasExpired = (mobileAuth: IMobileAuth | null): boolean => {
  if (!mobileAuth) return true;
  return Date.now() > mobileAuth.expires;
};
