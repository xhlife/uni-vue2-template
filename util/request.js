// import config from "@/common/config.js";

const config = Symbol("config");

const isCompleteURL = Symbol("isCompleteURL");

const requestBefore = Symbol("requestBefore");

const requestAfter = Symbol("requestAfter");

class Request {
  // 基本配置
  [config] = {
    baseURL: "",
    header: {
      "content-type": "application/json",
    },
    method: "GET",
    dataType: "json",
    responseType: "text",
  };

  // 拦截
  interceptors = {
    request: (func) => {
      if (func) {
        Request[requestBefore] = func;
      } else {
        Request[requestBefore] = (request) => request;
      }
    },
    response: (func) => {
      if (func) {
        Request[requestAfter] = func;
      } else {
        Request[requestAfter] = (response) => response;
      }
    },
  };

  // 检测是否是完整的url
  static [isCompleteURL](url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }

  // 修改配置
  setConfig(func) {
    this[config] = func(this[config]);
  }

  request(options = {}) {
    options.baseURL = options.baseURL || this[config].baseURL;
    options.dataType = options.dataType || this[config].dataType;

    options.url = Request[isCompleteURL](options.url)
      ? options.url
      : options.baseURL + options.url;

    options.data = options.data;

    // 传入的header属性会覆盖基本的
    options.header = { ...this[config].header, ...options.header };

    options.method = options.method || this[config].method;

    // 拦截之前的调用
    options = { ...options, ...Request[requestBefore](options) };

    return new Promise((resolve, reject) => {
      options.success = function (res) {
        resolve(Request[requestAfter](res));
      };
      options.fail = function (err) {
        reject(Request[requestAfter](err));
      };

      // 通过uni.request请求接口
      uni.request(options);
    });
  }

  get(url, data, options = {}) {
    options.url = url;
    options.data = data;
    options.method = "GET";
    return this.request(options);
  }

  post(url, data, options = {}) {
    options.url = url;
    options.data = data;
    options.method = "post";
    return this.request(options);
  }
}

// 可以通过 vue 的插件机制安装在vue的原型上
Request.install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      // debugger;
      if (this.$options.request) {
        Vue._request = this.$options.request;
      }
    },
  });
  Object.defineProperty(Vue.prototype, "$apis", {
    get() {
      return Vue._request.apis;
    },
  });
};

export default Request;
