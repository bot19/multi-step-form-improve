import { useOnboardForm } from '../hooks/useOnboardForm';

type PasswordStrength = 'empty' | 'very-weak' | 'weak' | 'average' | 'strong';

// TODO: better if this uses zod valiator.
const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) return 'empty';

  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const metRequirements = Object.values(requirements).filter(Boolean).length;

  // If only length requirement is met, it's very weak
  if (requirements.length && metRequirements === 1) {
    return 'very-weak';
  }

  // If 2 requirements are met, it's weak
  if (metRequirements === 2) {
    return 'weak';
  }

  // If 4 requirements are met, it's average
  if (metRequirements === 4) {
    return 'average';
  }

  // If all requirements are met and length is 16+, it's strong
  if (metRequirements === 5 && password.length >= 16) {
    return 'strong';
  }

  // If all requirements are met but length < 16, it's average
  if (metRequirements === 5) {
    return 'average';
  }

  // If 3 requirements are met, it's weak
  if (metRequirements === 3) {
    return 'weak';
  }

  // Default to very weak
  return 'very-weak';
};

const getStrengthConfig = (strength: PasswordStrength) => {
  switch (strength) {
    case 'empty':
      return { width: '0%', color: 'bg-gray-200', label: 'Very weak' };
    case 'very-weak':
      return { width: '25%', color: 'bg-red-500', label: 'Very weak' };
    case 'weak':
      return { width: '50%', color: 'bg-orange-500', label: 'Weak' };
    case 'average':
      return { width: '75%', color: 'bg-yellow-500', label: 'Average' };
    case 'strong':
      return { width: '100%', color: 'bg-green-500', label: 'Strong' };
    default:
      return { width: '0%', color: 'bg-gray-200', label: 'Very weak' };
  }
};

export const PasswordStrengthIndicator = () => {
  const { watch } = useOnboardForm();
  const password = watch('password') || '';
  const strength = calculatePasswordStrength(password);
  const config = getStrengthConfig(strength);

  return (
    <div>
      <h4 className="sr-only">Password strength</h4>
      <div aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            style={{ width: config.width }}
            className={`h-2 rounded-full transition-all duration-300 ${config.color}`}
          />
        </div>
        <div className="mt-2 grid grid-cols-4 text-sm font-medium text-gray-600">
          <div className={strength === 'very-weak' ? 'text-red-500' : ''}>
            Very weak
          </div>
          <div
            className={`text-center ${strength === 'weak' ? 'text-orange-500' : ''}`}
          >
            Weak
          </div>
          <div
            className={`text-center ${strength === 'average' ? 'text-yellow-500' : ''}`}
          >
            Average
          </div>
          <div
            className={`text-right ${strength === 'strong' ? 'text-green-500' : ''}`}
          >
            Strong
          </div>
        </div>
      </div>
    </div>
  );
};
