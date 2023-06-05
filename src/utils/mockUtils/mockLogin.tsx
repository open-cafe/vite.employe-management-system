import useAuth from '@/hooks/useAuth';
import Cookie from 'js-cookie';

jest.mock('js-cookie', () => jest.fn());
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

jest.mock('@/hooks/useAuth');
export const authMockData = () => {
  (useAuth as jest.Mock).mockReturnValue({
    loginLoading: false,
    loginAction: jest
      .fn()
      .mockImplementation((a, b) => b.onSuccess(mockResponse)),
  });
};
