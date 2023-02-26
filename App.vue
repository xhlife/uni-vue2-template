<script>
export default {
  globalData: {
    navBarHeight: 0, // 导航栏高度
    menuBottom: 0, // 胶囊距底部间距（保持底部间距一致）
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
  },
  onLaunch: function () {},
  onShow: function () {
    const _this = this;
    this.setNavBarInfo();
    // uni.login({
    //   provider: "weixin",
    //   success: function (loginRes) {
    //     // console.log(_this.$store);
    //     // console.log(loginRes);
    //     // 获取用户信息
    //     // uni.getUserInfo({
    //     //   provider: "weixin",
    //     //   success: function (infoRes) {
    //     //     console.log("用户昵称为：" + infoRes.userInfo.nickName);
    //     //   },
    //     // });
    //     _this.$apis.$login({
    //       appId: "hysj_applet",
    //       code: loginRes.code,
    //     });
    //   },
    // });
  },
  onHide: function () {
    // console.log("App Hide");
  },
  methods: {
    setNavBarInfo() {
      // 获取系统信息
      const systemInfo = wx.getSystemInfoSync();
      // 胶囊按钮位置信息
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
      this.globalData.navBarHeight =
        (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
        menuButtonInfo.height +
        systemInfo.statusBarHeight;
      this.globalData.menuBottom =
        menuButtonInfo.top - systemInfo.statusBarHeight;
      this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
      this.globalData.menuHeight = menuButtonInfo.height;
    },
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./style/common.scss";
</style>
