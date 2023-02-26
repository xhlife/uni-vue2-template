Component({
	data: {
		selected: 0,
		color: "#666",
		selectedColor: "#C30E23 ",
		list: [{
				"pagePath": "/pages/index/index",
				"iconPath": "/static/address.png",
				"selectedIconPath": "/static/address.png",
				"text": "积分商城"
			},
			{
				"pagePath": "/pages/mine/index",
				"iconPath": "/static/address.png",
				"selectedIconPath": "/static/address.png",
				"text": "我的"
			},
		],
		userPhone: '123'
	},
	attached() {
		const phone =  wx.getStorageSync('phone')
		// 如果缓存没有手机号，那么就需要授权获取手机号
		// this.setData({
		// 	userPhone: phone
		// })
	},
	pageLifetimes: {
		show: function () {
			console.log('show')
			
		},
	},
	methods: {
		switchTab(e) {

			try {
				const data = e.currentTarget.dataset
				const url = data.path
				// 获取是否有phone
				const phone =  wx.getStorageSync('phone')
				// console.log(phone)
				// 如果没有phone那么
				// if(!phone && url === '/pages/register/register') {
				// 	console.log('123')
				// 	return
				// }
				wx.switchTab({
					url
				})
				this.setData({
					// userPhone: phone,
					selected: data.index
				})
			} catch (e) {
			  // Do something when catch error
			}
		},
		getPhoneNumber (e) {
		    console.log(e.detail.code)
		}
	}
})
