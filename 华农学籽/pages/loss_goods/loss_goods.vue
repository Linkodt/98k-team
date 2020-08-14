<template>
	<view>
		<view class="head" :class="{'head_filter':!isShow}" >
			遗失物品信息
		</view>
		<view  class="all_list" :class="{'all_list_filter':!isShow}"  v-for="(items,index) in list" v-bind:key="index" >
			<view class="all_list_head">
				<image class="all_list_head_image" :src="items.head_src" mode="widthFix"></image>
				<text class="all_list_head_name" >{{items.name}}</text>
				<text class="all_list_head_time" >{{items.time}}</text>
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
		<view class="add_pop" v-show="isShow">
			<image src="../../static/icon/1-8p/add@2x.png" class="add_pop_image" @click="Show_action" mode=""></image>
		</view>
		<view class="bottom_aciton" :class="isShow==false ? 'bottom_action_transition':'bottom_action_transition_1'" >
			<view class="three_choose">
			<image src="../../static/icon/1-8p/组458@2x.png" @click="Choice (0)" mode="widthFix" class="want_loss" ></image>
			<image src="../../static/icon/1-8p/add2@2x.png" mode="" class="close" @click="close_action" ></image>
			<image src="../../static/icon/1-8p/组459@2x.png" @click="Choice (1)" mode="widthFix" class="my_loss" ></image>
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
						wp_src:"../../static/icon/1-8p/Image4.png"
					},
					{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png"
					},{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png"
					},{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png"
					},{
						head_src:"../../static/icon/IMG_1745.JPG",
						name:"可达鸭",
						time:"2020年7月29日",
						detail:"物品特征：于今日中午西园丢失水壶一瓶，\n物品特征：于今日中午西园丢失水壶一瓶\n物品特征：于今日中午西园丢失水壶一瓶",
						connection:"12345678900",
						wp_src:"../../static/icon/1-8p/Image4.png"
					}
				]
				,
				// isShow:false
				isShow:true,
				area:0
			}
		},
		methods: {
			Show_action:function(){
				this.isShow=false
				console.log(this.isShow)
			},
			close_action:function(){
				this.isShow=true
			},
			Choice:function(e){
				console.log(e)
				if (e==0){
					console.log("发布挂失")
					uni.navigateTo({
						url:"../send_loss/send_loss"
					})
				}else if (e==1){
					console.log("我的挂失")
					uni.navigateTo({
						url:"../my_loss/my_loss"
					})
				}
			}
		},
		onLoad(e){
			var that = this
			console.log(e)
			that.area = Number(e.area)
			rap.globalData.area = Number(e.area)
			that.request({
				url:"http://www.garbageclassifier.club:8080/get_loss",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					area:that.area
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
						wp_src:res.data.Loss[i].Picture
					}
					that.list.push(data)
				}
				
			})
		},
		onShow(){
			var that = this
			// console.log(e)
			// that.area = Number(e.area)
			that.request({
				url:"http://www.garbageclassifier.club:8080/get_loss",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					area:that.area
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
						wp_src:res.data.Loss[i].Picture
					}
					that.list.push(data)
				}
				
			})
		}
	}
</script>

<style lang="scss">
.head{
	padding-top: 20rpx;
	padding-left: 20rpx;
	font-size: 35rpx;
	font-weight: bold;
	border-top: 0.5px solid #E5E5E5;
}
.all_list{
	border-bottom: 0.5px solid #E5E5E5;
	.all_list_head{
		margin-top: 20rpx;
		margin-left: 5vw;
		position: relative;
		.all_list_head_image{
			width: 10vw;
		}
		.all_list_head_name{
			text-align: ceter;
			color: #888888;
			margin-left: 10rpx;
			position: absolute;
			margin-top: 20rpx;
		}
		.all_list_head_time{
			text-align: ceter;
			color: #888888;
			// justify-content: end;
			float: right;
			font-size: 20rpx;
			// position: absolute;
			margin-top: 20rpx;
			margin-right: 20rpx;
		}
	}
	.all_list_detail{
		margin-top: 10rpx;
		margin-left: 5vw;
		width: 95vw;
		font-weight: bold;
	}
	.all_list_connection{
		margin-top: 10rpx;
		margin-left: 5vw;
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
.add_pop{
	bottom: 100rpx;
	width: 100%;
	height: 50px;
	right: 50rpx;
	position: fixed;
	.add_pop_image{
		width: 120rpx;
		height: 120rpx;
		float: right;
		z-index: 9999;
	}
}
.head_filter{
	filter:blur(10px);
}
.all_list_filter{
	filter:blur(10px);
}
.bottom_aciton{
	border-top: 1px solid #dadada;
	bottom: 0rpx;
	width: 100%;
	// height: 0rpx;
	// height:400rpx;
	background-color: #FFFFFF;
	z-index: 9999;
	position: fixed;
	border-radius: 25px 25px 0 0;
	transition-property:height;
	transition-duration: 0.5s;
	transition-timing-function: ease;
	// display: inline-flex;
	.three_choose{
		// justify-content: space-around;
		display: inline-flex;
		margin-left: 100rpx;
		margin-top: 50rpx;
		.want_loss{
			width: 200rpx;
		}
		.my_loss{
			width: 200rpx;
		}
		.close{
			width: 150rpx;
			height: 150rpx;
			margin-top: 150rpx;
		}
	}
}
.bottom_action_transition{
	height: 400rpx;
}
.bottom_action_transition_1{
	height: 0rpx;
}
page{
	background-color: #FFFFFF;
}
</style>

