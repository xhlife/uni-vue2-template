import App from "./App";
import Request from "./util/request";
import request from "./api/index";
import Cache from "./util/cache";
import store from "./store";

// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = false;
App.mpType = "app";

Vue.use(Request);
Vue.use(Cache);

// import NavBar from "./components/NavBar/index";
// Vue.component("NavBar", NavBar);
const app = new Vue({
  ...App,
  store,
  request,
});
app.$mount();

// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
