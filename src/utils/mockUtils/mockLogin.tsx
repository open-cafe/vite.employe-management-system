import useAuth from '@/hooks/useAuth';
import Cookie from 'js-cookie';

jest.mock('js-cookie', () => jest.fn());
const mockResponse1 = {
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
};

const mockResponse2 = {
  data: {
    data: {
      access_token: 'test',
      role: 'Employee',
      employeeDetail: null,
    },
  },
};

jest.mock('@/hooks/useAuth');
export const authMockData = () => {
  (useAuth as jest.Mock).mockReturnValue({
    loginLoading: false,
    loginAction: jest
      .fn()
      .mockImplementation((a, b) => b.onSuccess(mockResponse1)),
  });
};

export const authMockData2 = () => {
  (useAuth as jest.Mock).mockReturnValue({
    loginLoading: false,
    loginAction: jest
      .fn()
      .mockImplementation((a, b) => b.onSuccess(mockResponse2)),
  });
};

export const errorMockData = () => {
  (useAuth as jest.Mock).mockReturnValue({
    loginLoading: false,
    loginAction: jest.fn().mockImplementation((a, b) => b.onError()),
  });
};
