import axios from "axios";
import newDebounce from "@/utils/debounce";
import { Notify } from "uiw";

axios.interceptors.request.use(
  async (response) => {
    let token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      response.headers = {
        ...response.headers,
        Authorization: token
      }
    }
    if (response.headers && response.headers.token) {
      delete response.headers.token
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  async (response) => {
    const { message, msg, code } = response?.data || {};
    if (code === 401) {
      await newDebounce(Notify.error, 500, {
        title: message || msg || "未登录 请先登录"
      });
      localStorage.removeItem("token");
      // navigate("/login");
    } else if (code !== 200 && code !== 401) {
      // 判断是否为 Blob 数据
      const contentType = response.headers['content-type'];
      const types = ['application/msword;charset=UTF-8'];
      if (!(response?.data instanceof Blob) && !types.includes(contentType)) {
        await newDebounce(Notify.error, 300, {
          title: "响应失败",
          description: message || msg,
          duration: 3,
        });
      }
      // 判断是否为 xml 数据, 是不提示响应失败
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);