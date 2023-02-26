<template>
	<view class="content width-100p bg-base">
		<uni-nav-bar :fixed="true" :border="false" status-bar class="width-100p">
			<view class="width-100p text-c font-36 flex-c text-color-base font-w-500">积分商城</view>
		</uni-nav-bar>
		<view class="tab bg-white">
			<view class="tab-all text-c" @click="changeTab(0)" :class="{active: activeTabIndex === 0}">
				全部
			</view>
			<view class="tab-auth text-c" @click="changeTab(1)" :class="{active: activeTabIndex === 1}">
				我可兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTabIndex: 0
			};
		},
		components: {

		},
		onLoad() {
			// const app = getApp();
			// console.log(app);
		},

		methods: {
			goto(url) {
				uni.navigateTo({
					url: url,
				});
			},
			changeTab(idx) {
				this.activeTabIndex = idx
			}
		},
	};
</script>

<style lang="scss">
	.content {
		width: 100vw;
		min-height: 100vh;

		.tab {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100rpx;

			&-all {
				flex: 1;
			}

			&-auth {
				flex: 1;
			}
			.active {
				color: #C30E23;
			}
		}
	}
</style>
