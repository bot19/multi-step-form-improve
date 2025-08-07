// import { cn } from '../../utils';
import type { FieldError } from 'react-hook-form';
import { useOnboardForm } from '../../hooks/useOnboardForm';
import { SvgCheckbox } from './SvgCheckbox';
import type { UserDetailsType } from '../../validators/onboard.validator';

// TODO: implement the rest
interface InputCheckboxProps {
  // disabled?: boolean;
  error?: FieldError;
  label: string;
  checkboxes: {
    name: keyof UserDetailsType;
    ariaDescription: string;
    text: string;
  }[];
  requiredLabel?: boolean;
  [key: string]: unknown; // Allow additional props to be passed through
}

export const InputCheckbox = ({
  // disabled,
  error,
  label,
  checkboxes,
  requiredLabel,
  // ...inputProps
}: InputCheckboxProps) => {
  const { register } = useOnboardForm();

  return (
    <fieldset>
      <legend className="sr-only">Notifications</legend>
      <div className="flex items-center justify-between">
        <span className="block text-sm/6 font-medium text-secondary">
          {label}
        </span>
        {requiredLabel && (
          <span className="text-sm/6 text-gray-500">Required</span>
        )}
      </div>

      <div className="mt-2 space-y-2">
        {checkboxes.map(checkbox => (
          <div className="flex gap-3" key={checkbox.name}>
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-4 grid-cols-1">
                <input
                  id={checkbox.name}
                  type="checkbox"
                  aria-describedby={checkbox.ariaDescription}
                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  {...register(checkbox.name)}
                />
                <SvgCheckbox />
              </div>
            </div>
            <div className="text-sm/6">
              <label
                htmlFor={checkbox.name}
                className="font-medium text-gray-900"
              >
                {checkbox.text}
              </label>
            </div>
          </div>
        ))}
        {error && (
          <p className="mt-2 text-sm/6 text-red-500">{error.message}</p>
        )}
      </div>
    </fieldset>
  );
};
