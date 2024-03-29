import '@testing-library/jest-dom/extend-expect';

jest.mock('@/constants/environment', () => ({
  host: 'http://localhost:3000',
}));

jest.mock('@/utils/authCookies', () => ({
  cookieName: 'auth',
  getCookie: () => 'token',
  setCookie: () => {},
  deleteCookie: () => {},
}));

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
