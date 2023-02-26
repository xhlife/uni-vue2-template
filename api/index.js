import Request from "../util/request";
import loginApi from "./login";
export const _request = new Request();

let baseURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://192.168.1.131/api";
  // baseURL = "http://www.baidu.com";
} else {
  baseURL = "http://www.baidu.com";
}
// 请求拦截器
_request.interceptors.request((request) => {
  // console.log("loading");
  return request;
});

// 响应拦截器
_request.interceptors.response((response) => {
  // console.log("response", response);
  return response.data;
});

// 设置默认配置
_request.setConfig((config) => {
  // console.log(process.env);
  config.baseURL = baseURL;
  return config;
});

// 通过options的方式传入 new Vue(options)中
export default {
  apis: {
    // 解构出来的接口后面的别和前面的重复， 因此，尽量分模块来命名
    ...loginApi,
  },
};

/**
  vue实例上的this.$apis指向 上面的apis, 
  this.$apis.xxx(data)就是对应的 Request实例，  
*/
