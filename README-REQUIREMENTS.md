# Senior Frontend Engineer Technical Assignment

## Requirements

Build a responsive 3-step onboarding flow for a web application. The process should guide users through mobile verification, personal details collection, and password setup.

### Step 1:

Mobile verification with 6 digits OTP

### Step 2:

Form fields to collect user’s

- Full Name (required)
- Email Address (required, with email validation)
- Date of Birth (required, date picker or dropdowns)
- Gender (optional)

### Step 3:

Including password input field and confirm field with show/hide toggle.
Password strength indicator with requirements:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Sample User Flow:

1. User enters phone number → clicks "Send OTP"
2. User receives simulated OTP → enters code → proceeds to step 2
3. User fills personal details → validation passes → proceeds to step 3
4. User creates password → meets all requirements → completes onboarding
5. Success screen with "Get Started" button

### Core Functionality

- Step Navigation: Users can only move forward when current step is valid, and is allowed to go back to
  previous steps
- Progress Indicator: Visual progress bar showing current step (1/3, 2/3, 3/3)
- Form Persistence: Form data should persist when navigating between steps
- Error Handling: Clear, helpful error messages
- Responsive Design: Works on mobile and desktop
- Loading States: Show appropriate loading indicators during "API calls"
- Simulate backend interactions with mock APIs

## Evaluation Criteria

- Clean, readable, well-structured code, and good practices
- Proper separation of concerns
- Component reusability
- Consistent naming conventions
- All features work as specified
- Proper form validation and error handling
- Smooth user flow

## Bonus Points

- TypeScript usage
- Custom hooks
- Accessibility: Proper ARIA labels, keyboard navigation, focus management
- Animated transitions between steps
- Unit tests for key functionality
- Form auto-save functionality

## Tech Stack

- React.js as main framework
- It’s free to choose other tool libraries for form validation, router or styling, etc.

## Submission

- Submit via GitHub repo or ZIP file
- Include setup instructions to install and run the test
- Include any assumptions made (e.g., expected result on form submission)
- Known limitations or incomplete areas (if any)
