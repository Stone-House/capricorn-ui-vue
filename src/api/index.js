import axios from 'axios';
import Cookies from 'js-cookie';
import { Notification } from 'element-ui';
var csrftoken = Cookies.get('csrfToken');
const instance = axios.create({
  headers: { csrf: csrftoken },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    
    Notification.error({
      title: error.response.status,
      message: error.response.data.message,
    })

    // 统一捕获错误
    if (error.response.status === 500) {
    } else if (error.response.status === 401) {
    } else if (error.response.status === 404) {
    } else if (error.response.status === 400) {
    }
    
    
    return Promise.resolve(error.response);
  },
);

export default instance;
