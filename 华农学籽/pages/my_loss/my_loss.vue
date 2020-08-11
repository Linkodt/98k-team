<template>
	<view>
		<view  class="all_list"  v-for="(items,index) in list" v-bind:key="index" >
			<view class="all_list_head">
				<text class="all_list_head_time" >{{items.time}}</text>
				<text class="all_list_head_button">
					取消挂失
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
			}
		},
		methods: {
			
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
