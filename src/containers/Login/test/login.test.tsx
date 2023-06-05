import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/containers/Login';

import { BrowserRouter } from 'react-router-dom';

import { QueryClientMockProvider } from '@/utils/mockUtils/mockProvider';
import { authMockData } from '@/utils/mockUtils/mockLogin';
import useAuth from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth');

const mockResponse = {
  data: {
    data: {
      data: {
        access_token: 'test',
        role: 'Employee',
        employeeDetail: {
          id: 1,
          name: 'test',
          designation: 'test',
          phoneNumber: 'test',
        },
      },
    },
  },
};

const loginAction = jest
  .fn()
  .mockImplementation((a, b) => b.onSuccess(mockResponse));

const renderLogin = () => {
  render(
    <BrowserRouter>
      <QueryClientMockProvider component={<Login />} />
    </BrowserRouter>
  );
};

describe('Login', () => {
  test('renders login form', () => {
    authMockData();
    renderLogin();
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  test('fills in form inputs and submits successfully', async () => {
    // authMockData();
    (useAuth as jest.Mock).mockReturnValue({
      loginLoading: false,
      loginAction: loginAction,
    });
    jest.mock('js-cookie', () => ({ set: () => 'nfadkfnkladjfakljflkajflk' }));
    renderLogin();
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Log in/i });

    // Fill in form inputs
    userEvent.type(emailInput, 'opencafe@opencafe.io');
    userEvent.type(passwordInput, 'Password123!');

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
});
