import { _request } from ".";
const loginApi = {
  $login(data) {
    return _request.post("/account/open/weChat/applet/login/code", data);
  },
};

export default loginApi;
