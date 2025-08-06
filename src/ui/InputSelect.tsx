import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { cn } from '../utils';
import type { FieldError } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface InputSelectProps {
  autoComplete?: string;
  disabled?: boolean;
  error?: FieldError;
  label: string;
  name: string;
  options: SelectOption[];
  requiredLabel?: boolean;
  [key: string]: unknown; // Allow additional props to be passed through
}

export const InputSelect = ({
  disabled,
  error,
  label,
  name,
  options,
  requiredLabel,
  autoComplete,
  ...selectProps
}: InputSelectProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-secondary"
        >
          {label}
        </label>
        {requiredLabel && (
          <span className="text-sm/6 text-gray-500">Required</span>
        )}
      </div>

      <div className="mt-2">
        <div className="grid grid-cols-1 focus-within:relative">
          <select
            id={name}
            name={name}
            autoComplete={autoComplete}
            aria-label={label}
            disabled={disabled}
            className={cn(
              'col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary xs:text-sm/6',
              error &&
                'text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600',
              disabled &&
                'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200'
            )}
            {...selectProps}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 xs:size-4"
          />
        </div>
      </div>
      {error && <p className="mt-2 text-sm/6 text-red-500">{error.message}</p>}
    </div>
  );
};
