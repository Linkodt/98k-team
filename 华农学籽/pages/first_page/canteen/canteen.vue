<template>
	<view class="all_list" >
		<view class="one" v-for="items in list" v-bind:key="items.name" @click="naviTocanteen(items)" >
			<view class="one_high_image">
			<image :src="items.img" mode="aspectFit"  ></image>
			</view>
			<view class="big_wenzi">
				<text>{{items.name}}</text>
			</view>
			<view class="small_wenzi">
				<image src="../../../static/icon/1-8p/icon-locate.png" mode="" class="one_small_image_1" ></image>
				<text class="one_small_wenzi" >{{items.position}}</text>
				<image src="../../../static/icon/1-8p/icon-go.png" mode="" class="one_small_image_2" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{name:"西园",position:"华山",img:"../../../static/icon/1-8p/illustrator1@2x.png"},
					{name:"荷园",position:"启林南",img:"../../../static/icon/1-8p/illustrator2@2x.png"},
					{name:"绿榕园",position:"主校区",img:"../../../static/icon/1-8p/illustrator3@2x.png"},
					{name:"稻香园",position:"启林北",img:"../../../static/icon/1-8p/illustrator4@2x.png"},
					{name:"莘园",position:"六一区",img:"../../../static/icon/1-8p/illustrator5@2x.png"},
					{name:"芷园",position:"东区",img:"../../../static/icon/1-8p/illustrator6@2x.png"}
				]
			}
		},
		methods: {
			naviTocanteen:function(e){
				console.log("我点击了！！")
				console.log(e)
				console.log(e.name)
			}
		}
	}
</script>

<style lang="scss" scoped>
.all_list{
	display: flex;
	flex-wrap: wrap;
	.one{
		border: 0.5px solid #fcfcfc;
		box-shadow:1px 1px 1px #E5E5E5 ;
		border-radius:25rpx ;
		// display: flex;
		padding-left: 20rpx;
		background-color: #fcfcfc;
		margin-top: 40rpx;
		margin-left: 50rpx;
		width: 40%;
		height: 300rpx;
		.one_high_image{
			margin-top: 15rpx;
			image{
				width: 80px;
				height: 80px;
			}
		}
		.big_wenzi{
			margin-left: 10rpx;
			text{
				font-weight: 20rpx;
				font-size: 40rpx;
				color: #ebb06d;
			}
		}
		.small_wenzi{
			position: relative;
			.one_small_image_1{
				width: 20rpx;
				height: 20rpx;
				margin-right: 20rpx;
			}
			.one_small_wenzi{
				font-size: 25rpx;
				color: #f3d8b9;
			}
			.one_small_image_2{
				margin-top: 10rpx;
				margin-right: 20rpx;
				float: right;
				width: 20rpx;
				height: 20rpx;
			}
		}
	}
}
</style>
