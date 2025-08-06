import { test, expect } from '@playwright/test';

test('happy path, complete onboarding flow', async ({ page }) => {
  await page.goto('http://localhost:5179/');
  await page.getByRole('spinbutton', { name: 'Mobile number' }).click();
  await page
    .getByRole('spinbutton', { name: 'Mobile number' })
    .fill('0433222112');
  await page.getByRole('button', { name: 'Get code' }).click();

  await page.getByRole('spinbutton', { name: 'OTP code' }).fill('123123');
  await page.getByRole('button', { name: 'Verify' }).click();

  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.getByRole('textbox', { name: 'Date of birth' }).fill('1999-07-30');
  await page.getByLabel('Gender').selectOption('male');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('textbox', { name: 'Create your password' }).click();
  await page
    .getByRole('textbox', { name: 'Create your password' })
    .fill('asdfASDF1@');
  await page
    .locator('div')
    .filter({ hasText: /^Create your passwordRequiredShow$/ })
    .getByRole('button')
    .click();
  await page.getByRole('textbox', { name: 'Confirm your password' }).click();
  await page
    .getByRole('textbox', { name: 'Confirm your password' })
    .fill('asdfASDF1@');
  await page.getByRole('button', { name: 'Show' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

  // Handle the restart confirmation dialog
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept(); // Click OK to restart the flow
  });

  await page.getByRole('button', { name: 'Get Started' }).click();

  // Verify we're back to step 1 (mobile verification) after accepting the dialog
  await expect(
    page.getByRole('spinbutton', { name: 'Mobile number' })
  ).toBeVisible();
  console.log('✅ Confirmed app returned to step 1 after dialog acceptance');
});

test('error path, mock responses, validation errors, correct to complete onboarding flow', async ({
  page,
}) => {
  await page.goto('http://localhost:5179/');
  await page.getByRole('spinbutton', { name: 'Mobile number' }).click();
  await page
    .getByRole('spinbutton', { name: 'Mobile number' })
    .fill('0433222111');
  await page.getByRole('button', { name: 'Get code' }).click();
  await page.getByRole('spinbutton', { name: 'Mobile number' }).click();
  await page
    .getByRole('spinbutton', { name: 'Mobile number' })
    .fill('0400000000');
  await page.getByRole('button', { name: 'Get code' }).click();
  await page.getByRole('spinbutton', { name: 'Mobile number' }).click();
  await page
    .getByRole('spinbutton', { name: 'Mobile number' })
    .fill('0400000001');
  await page.getByRole('button', { name: 'Get code' }).click();
  await page.getByRole('spinbutton', { name: 'OTP code' }).fill('000000');
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('spinbutton', { name: 'OTP code' }).click();
  await page.getByRole('spinbutton', { name: 'OTP code' }).fill('000001');
  await page.getByRole('button', { name: 'Verify' }).click();

  await page.getByRole('button', { name: 'Next' }).click();

  // Handle the validation error dialog
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept(); // Click OK to acknowledge the error
  });

  await page.getByRole('button', { name: 'Back' }).click();

  // Verify we're back to step 1 (mobile verification) after accepting the dialog
  await expect(
    page.getByRole('spinbutton', { name: 'Mobile number' })
  ).toBeVisible();
  console.log('✅ Confirmed app returned to step 1 after dialog acceptance');

  await page.getByRole('button', { name: 'Get code' }).click();
  await page.getByRole('spinbutton', { name: 'OTP code' }).click();
  await page.getByRole('spinbutton', { name: 'OTP code' }).fill('123123');
  await page.getByRole('button', { name: 'Verify' }).click();

  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.getByRole('textbox', { name: 'Date of birth' }).fill('1999-10-10');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Create your password' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Create your password' }).click();
  await page
    .getByRole('textbox', { name: 'Create your password' })
    .fill('asdfASDF1@');
  await page
    .locator('div')
    .filter({ hasText: /^Create your passwordRequiredShow$/ })
    .getByRole('button')
    .click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Confirm your password' }).click();
  await page
    .getByRole('textbox', { name: 'Confirm your password' })
    .fill('asdfASDF1@');
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

  // First "Get Started" dialog - dismiss to stay on success step
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss(); // Click Cancel to stay on success step
  });

  await page.getByRole('button', { name: 'Get Started' }).click();

  // Second "Get Started" dialog - accept to go back to step 1
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept(); // Click OK to restart the flow
  });

  await page.getByRole('button', { name: 'Get Started' }).click();

  // Verify we're back to step 1 (mobile verification) after accepting the dialog
  await expect(
    page.getByRole('spinbutton', { name: 'Mobile number' })
  ).toBeVisible();
  console.log('✅ Confirmed app returned to step 1 after dialog acceptance');
});

test('persist form data and form progress (step 2)', async ({ page }) => {
  await page.goto('http://localhost:5179/');
  await page.getByRole('spinbutton', { name: 'Mobile number' }).click();
  await page
    .getByRole('spinbutton', { name: 'Mobile number' })
    .fill('0422333111');
  await page.getByRole('button', { name: 'Get code' }).click();
  await page.getByRole('spinbutton', { name: 'OTP code' }).fill('123123');
  await page.getByRole('button', { name: 'Verify' }).click();

  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.getByRole('textbox', { name: 'Date of birth' }).fill('1999-10-10');

  await page.goto('http://localhost:5179/');
  // expect full name to have "test"
  await expect(page.getByRole('textbox', { name: 'Full name' })).toHaveValue(
    'test'
  );
  // expect email to have "test@test.com"
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(
    'test@test.com'
  );
  // expect date of birth to have "1999-10-10"
  await expect(
    page.getByRole('textbox', { name: 'Date of birth' })
  ).toHaveValue('1999-10-10');

  // click next (can only proceed if all required fields are filled)
  await page.getByRole('button', { name: 'Next' }).click();
  console.log(
    '✅ Confirmed app persisted form data and form progress (step 2)'
  );
});
