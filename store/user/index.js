const user = {
  state: {
    userInfo: {},
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },
  actions: {
    setUserInfo({ commit }, userInfo) {
      commit("SET_USER_INFO", userInfo);
    },
  },
  getters: {
    userInfo: (state) => state.userInfo,
  },
};

export default user;
