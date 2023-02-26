<template>
  <view>
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="test"> 状态栏下的文字 </view>
    <!-- fixed的时候，用于撑开高度 -->
    <view v-if="fixed" style="height: 100px"></view>
  </view>
</template>

<script>
// 暂时不用，这个组件，用现成的uni-nav-bar
export default {
  props: {
    color: {
      type: String,
      default: "#000",
    },
    background: {
      type: String,
      default: "#fff",
    },
    title: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 38,
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const app = getApp();
    return {
      navBarHeight: app.globalData.navBarHeight, //导航栏高度
      menuBottom: app.globalData.menuBottom, //导航栏距离顶部距离
      menuRight: app.globalData.menuRight, //导航栏距离右侧距离
      menuHeight: app.globalData.menuHeight, //导航栏高度
      // navBarHeight: 0, //导航栏高度
      // menuBottom: 0, //导航栏距离顶部距离
      // menuRight: 0, //导航栏距离右侧距离
      // menuHeight: 0, //导航栏高度
    };
  },
  computed: {
    textStyle() {
      return {
        color: this.color,
        fontSize: this.size + "px",
        lineHeight: this.navBarHeight + "px",
      };
    },
  },
  mounted() {
    // console.log(this);
    // debugger;
  },
  methods: {
    goBack() {
      uni.navigateBack(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.test {
  position: fixed;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  z-index: 1000;
}
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}
.nav-main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.nav .capsule-box {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  .nav-content {
    display: flex;
    flex-wrap: nowrap;
    .text {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
