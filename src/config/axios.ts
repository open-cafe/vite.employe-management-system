import { host, cookieName } from '@/constants/environment';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = `${host}`;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get(
  cookieName
)}`;

export default axios;
