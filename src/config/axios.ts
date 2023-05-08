import { host, cookieName } from '@/constants/environment';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookie } from '@/utils/authCookies';

axios.defaults.baseURL = `${host}`;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get(
//   cookieName
// )}`;
//interceptor
axios.interceptors.request.use(async function (config) {
  if (getCookie(cookieName))
    config.headers.Authorization = `Bearer ${getCookie(cookieName)}`;
  return config;
});
export default axios;
