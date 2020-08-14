<template>
	<view>
	<u-tabs :list="list" font-size="28" bar-height="3" inactive-color="#888888" bar-width="350" active-color="#eba95f" :is-scroll="false" :current="current" @change="change" ></u-tabs>
	<view class="communities" v-if="current==0" >
		社团模块
	</view>
	<view class="canteen" v-if="current==1" >
		<Canteen></Canteen>
	</view>
	</view>
</template>

<script>
	import Canteen from "./canteen/canteen.vue"
	var rap = getApp()
	export default {
		data() {
			return {
				list: [{
					name: '社团咨询'
				}, {
					name: '饭堂咨询'
				}],
				current: 1,
				code:""
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		},
		components:{
			Canteen
		},
		onLoad() {
			var that = this
			uni.login({
				// timeout:0,
			}).then(res=>{
				console.log(res[1].code)
				// that.code = res[1].code
				uni.request({
					url:"http://www.garbageclassifier.club:8080/login",
					// url:"http://www.baidu.com",
					method:"POST",
					header:{
						'Content-Type' : "application/x-www-form-urlencoded"
					},
					data:{
						code:res[1].code
					}
				}).then(res=>{
					console.log(res)
					rap.globalData.openid = res[1].data.openid
					rap.globalData.userInfo = res[1].data.User
					
					console.log(rap.globalData.openid)
				})
			})
		}
	}
</script>

<style>

</style>
