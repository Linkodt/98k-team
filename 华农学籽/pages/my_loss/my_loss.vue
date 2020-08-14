<template>
	<view>
		<view  class="all_list"  v-for="(items,index) in list" v-bind:key="index" >
			<view class="all_list_head">
				<text class="all_list_head_time" >{{items.time}}</text>
				<text class="all_list_head_button" @click="changeState(index)" >
					{{items.whether}}
				</text>
			</view>
			<view class="all_list_detail">
				<text>{{items.detail}}</text>
			</view>
			<view class="all_list_connection">
				联系方式：{{items.connection}}
			</view>
			<view class="all_list_bigimage">
				<image :src="items.wp_src" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var rap = getApp()
	import moment from "moment"
	export default {
		data() {
			return {
				list:[
					{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png",
						whether:"取消挂失",
						state:0
					},
					{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png",
						whether:"取消挂失",
						state:0
					},{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png",
						whether:"取消挂失",
						state:0
					},{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png",
						whether:"取消挂失",
						state:0
					},{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png",
						whether:"取消挂失",
						state:0
					}
				]
			}
		},
		methods: {
			changeState(e){
				var that = this
				console.log(e) // index
				if(that.list[e].state==0){
					// that.list[e].LossId
					// 没取消挂失
					that.list[e].whether = "重新挂失"
				}else{
					that.list[e].whether = "取消挂失"
				}
				that.request({
					url:"http://www.garbageclassifier.club:8080/change_loss",
					method:"POST",
					header:{
						'Content-Type' : "application/x-www-form-urlencoded"
					},
					data:{
						openId:rap.globalData.openid,
						lossId:Number(that.list[e].LossId)
					}
				}).then(res=>{
					console.log(res)
					uni.showToast({
						title:"成功",
						icon:"none",
						duration:1000
					})
				})
				
			}
		},
		onLoad(){
			var that = this
			// console.log(e)
			that.request({
				url:"http://www.garbageclassifier.club:8080/get_my_loss",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					openId:rap.globalData.openid
				}
			}).then(res=>{
				console.log(res)
				that.list = []
				for (var i=0;i<res.data.Loss.length;i++){
					console.log("state:",res.data.Loss[i].State)
					console.log("挂失:",res.data.Loss[i].State==0?"取消挂失":"重新挂失")
					var wher = res.data.Loss[i].State==0?"取消挂失":"重新挂失"
					var day = moment.unix(res.data.Loss[i].Time).format("YYYY年MMM月D日")
					var data={
						head_src:res.data.Loss[i].User.Picture,
						name:res.data.Loss[i].Name,
						time:day,
						detail:res.data.Loss[i].Introduction,
						connection:res.data.Loss[i].Phone,
						wp_src:res.data.Loss[i].Picture,
						LossId:res.data.Loss[i].LossId,
						state:res.data.Loss[i].State,
						whether:wher
					}
					that.list.push(data)
				}
				console.log(that.list)
				
			})
		},
		onShow(){
			var that = this
			// console.log(e)
			that.request({
				url:"http://www.garbageclassifier.club:8080/get_my_loss",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					openId:rap.globalData.openid
				}
			}).then(res=>{
				console.log(res)
				that.list = []
				for (var i=0;i<res.data.Loss.length;i++){
					var day = moment.unix(res.data.Loss[i].Time).format("YYYY年MMM月D日")
					var data={
						head_src:res.data.Loss[i].User.Picture,
						name:res.data.Loss[i].Name,
						time:day,
						detail:res.data.Loss[i].Introduction,
						connection:res.data.Loss[i].Phone,
						wp_src:res.data.Loss[i].Picture,
						LossId:res.data.Loss[i].LossId,
						state:res.data.Loss[i].state,
						whether:res.data.Loss[i].state==0?"取消挂失":"重新挂失"
					}
					that.list.push(data)
				}
				
			})
		}
	}
</script>

<style lang="scss" >
.all_list{
	border-bottom: 0.5px solid #E5E5E5;
	.all_list_head{
		margin-top: 20rpx;
		margin-left: 5vw;
		position: relative;
		margin-bottom: 20rpx;
		// display: inline-block;
		.all_list_head_time{
			text-align: ceter;
			color: #888888;
			// justify-content: end;
			// float: left;
			font-size: 25rpx;
			// position: absolute;
			margin-top: 20rpx;
			margin-right: 20rpx;
			margin-bottom: 10rpx;
		}
		.all_list_head_button{
			font-size: 25rpx;
			background-color: #eaa960;
			color: white;
			border-radius: 20rpx 20rpx 20rpx 20rpx;
			padding: 8rpx 10rpx;
			float: right;
			margin-right: 10rpx;
		}
	}
	.all_list_detail{
		margin-top: 10rpx;
		margin-left: 5vw;
		width: 95vw;
		font-size: 26rpx;
		font-weight: 550;
	}
	.all_list_connection{
		margin-top: 10rpx;
		margin-left: 5vw;
		font-size: 25rpx;
		color:#b2b2b2 ;
	}
	.all_list_bigimage{
		margin-top: 10rpx;
		margin-left: 5vw;
		image{
			width: 90vw;
		}
		margin-bottom: 10rpx;
	}
}
</style>
