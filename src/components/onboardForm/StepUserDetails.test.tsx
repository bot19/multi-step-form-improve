import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { test, expect, vi, describe, beforeEach } from 'vitest';
import { StepUserDetails } from './StepUserDetails';
import type { OnboardingContextType } from '../../contexts/OnboardingContext';
import type { FormContextType } from '../../contexts/FormContext';

// Mock the hooks
vi.mock('../../hooks/useOnboarding');
vi.mock('../../hooks/useOnboardForm');

const mockUseOnboarding = vi.mocked(
  await import('../../hooks/useOnboarding')
).useOnboarding;
const mockUseOnboardForm = vi.mocked(
  await import('../../hooks/useOnboardForm')
).useOnboardForm;

describe('StepUserDetails', () => {
  const mockDispatch = vi.fn();

  const mockOnboardingState: OnboardingContextType = {
    state: {
      currentStep: 2,
      mobileAuth: null,
    },
    dispatch: mockDispatch,
  };

  const mockRegister = vi.fn();
  const mockFormMethods = {
    register: mockRegister,
    handleSubmit: vi.fn(),
    formState: {
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
      isDirty: false,
      isValid: false,
      isValidating: false,
      submitCount: 0,
      isLoading: false,
      isSubmitSuccessful: false,
      disabled: false,
      dirtyFields: {},
      touchedFields: {},
      defaultValues: {},
    },
    watch: vi.fn(),
    getValues: vi.fn(),
    setValue: vi.fn(),
    setFocus: vi.fn(),
    setError: vi.fn(),
    clearErrors: vi.fn(),
    reset: vi.fn(),
    resetField: vi.fn(),
    trigger: vi.fn(),
    unregister: vi.fn(),
    getFieldState: vi.fn(),
    subscribe: vi.fn(),
    control: {} as unknown,
  } as unknown as FormContextType;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementations
    mockUseOnboarding.mockReturnValue(mockOnboardingState);
    mockUseOnboardForm.mockReturnValue(mockFormMethods);

    // Mock register to return proper input props
    mockRegister.mockImplementation((name: string) => ({
      name,
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    }));
  });

  test('shows checkbox validation error when no checkbox is selected and form is submitted', async () => {
    // Mock form with filled values but no checkboxes selected
    const mockFormWithValues = {
      ...mockFormMethods,
      getValues: vi.fn().mockReturnValue({
        fullName: 'John Doe',
        email: 'john@example.com',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        emailContact: false,
        mobileContact: false,
        smsContact: false,
      }),
      formState: {
        ...mockFormMethods.formState,
        errors: {
          smsContact: {
            type: 'custom',
            message: 'Please select at least one contact method',
          },
        },
      },
      trigger: vi.fn().mockResolvedValue(false), // Validation fails
    };

    mockUseOnboardForm.mockReturnValue(mockFormWithValues);

    render(<StepUserDetails />);

    // Click the Next button to trigger validation
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText('Please select at least one contact method')
      ).toBeInTheDocument();
    });
  });
});
