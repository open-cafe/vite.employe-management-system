import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string) => {
  return Cookies.set(name, value, { expires: 30 });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const deleteCookie = (name: string) => {
  return Cookies.remove(name);
};
