import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '@/containers/Login';

import { MemoryRouter } from 'react-router-dom';

import { QueryClientMockProvider } from '@/utils/mockUtils/mockProvider';
import {
  authMockData,
  authMockData2,
  errorMockData,
} from '@/utils/mockUtils/mockLogin';
import useAuth from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth');

const mockResponse = {
  data: {
    data: {
      access_token: 'test',
      role: 'SuperAdmin',
    },
  },
};

const loginAction = jest
  .fn()
  .mockImplementation((a, b) => b.onSuccess(mockResponse));

const renderLogin = () => {
  render(
    // MemoryRouter is preferred for testing
    <MemoryRouter>
      <QueryClientMockProvider component={<Login />} />
    </MemoryRouter>
  );
};

const formInputs = async (email: string, password: string) => {
  const emailInput = screen.getByLabelText(/Email Address/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /Log in/i });

  // Fill in form inputs
  await userEvent.type(emailInput, email);
  await userEvent.type(passwordInput, password);

  // Submit the form
  fireEvent.click(submitButton);
};

afterEach(cleanup);

describe('Login successfully', () => {
  test('fills in form inputs and submits successfully and renders to the / route when login by admin and SuperAdmin', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      loginLoading: false,
      loginAction: loginAction,
    });
    renderLogin();

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    // Fill in form inputs
    await userEvent.type(emailInput, 'opencafe@opencafe.io');
    await userEvent.type(passwordInput, 'Password123!');

    expect(emailInput).toHaveValue('opencafe@opencafe.io');
    expect(passwordInput).toHaveValue('Password123!');

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for login action to be called
    await waitFor(() => {
      expect(loginAction).toHaveBeenCalledTimes(1);
    });

    // Check if the form inputs are cleared
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('renders to the / route after successful login by employee', async () => {
    authMockData();
    renderLogin();

    //send inputs to the form and submit
    await formInputs('employee@employee.com', 'Password123!');
  });

  test('renders to the /onboarding route if employee logs in for the first time', async () => {
    authMockData2();
    renderLogin();

    //send inputs to the form and submit
    await formInputs('test@example.com', 'Password123!');
  });
});

describe('Login Fails', () => {
  test('error message is displayed when login fails and disapper after few seconds', async () => {
    errorMockData();
    renderLogin();
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if the error message is displayed
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
    expect(
      screen.getByText(/email or password is incorrect/i)
    ).toBeInTheDocument();

    // Wait for the error message to disappear and wrapping the transition inside a test in act(...).
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
    });
    await waitFor(
      () => {
        return new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      },
      { timeout: 3000 }
    );

    // Check if the error message is not displayed
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  }, 8000);
});
