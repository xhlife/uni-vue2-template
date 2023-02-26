import Vue from "vue";
import Vuex from "vuex";
import mine from "./mine";
import user from "./user";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    base: "base",
  },
  modules: {
    mine,
    user,
  },
});

export default store;
