<template class="all_all" >
	<view class="all" >
		<view class="picker_name">
			<image src="../../static/icon/1-8p/icon-locate@2x.png" mode="" class="picker_image"></image>
			<picker mode="selector" :range="cateen_array" :value="cateen_index" @change="picker_change">
				<view class="picker_text" >{{cateen_array[cateen_index]}}</view>
			</picker>
		</view>
		<view class="top_list">
			<view class="top_list_view_1">
				<image src="../../static/icon/1-8p/461@2x.png" class="top_list_img_1" mode="widthFix" @click="click_img(0)" ></image>
			</view>
			<view class="top_list_view_2">
				<image src="../../static/icon/1-8p/459@2x.png" class="top_list_img_2" mode="widthFix" @click="click_img(1)" ></image>
			</view>
			<view class="top_list_view_3">
				<image src="../../static/icon/1-8p/460@2x.png" class="top_list_img_3" mode="widthFix" @click="click_img(2)" ></image>
			</view>
		</view>
		<view class="heng">
			<image src="../../static/icon/1-8p/headline@2x.png" mode="widthFix" class="heng_img" ></image>
		</view>
		<view class="dish_list" @click="naviTo_detail(index)" v-for="(item,index) in dish_list" v-bind:key="index" >
			<view class="dish_detail">
				<image :src="item.FoodPicture" mode=""></image>
			</view>
			<view class="dish_text">
			<view class="dish_detail_head">
			{{item.FoodName}}     {{item.Price}}元
				<!-- <text class="dish_detail_head_text" ></text> -->
			</view>
			<view class="dish_detail_text">
				{{item.Introduction}}
				<!-- <text></text> -->
			</view>
			<view class="dish_detail_down">
				<view class="dish_detail_position">
					{{item.Floor}}楼-{{item.Window}}号窗口
				</view>
				<view class="dish_detail_icon" v-bind:style="{marginLeft:styleO + 'vw'}" >
					<view class="dish_detail_rank">
						<image src="../../static/icon/20-/icon-like-press@2x.png" mode="widthFix"></image>
						<text>{{item.Praise}}</text>
					</view>
					<view class="dish_detail_pinglun">
						<image src="../../static/icon/20-/icon-comment-disable@2x.png" mode="widthFix"></image>
						<text>{{item.Comment}}</text>
					</view>
				</view>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	var rap = getApp()
	export default {
		data() {
			return {
				styleO:30,
				// picker元素相关
				cateen_array: ['西园', '荷园', '绿榕园','稻香园','莘园','芷园'],
				cateen_index:0,
				// index + 1 就是对应的area值
				// top部分三个功能相关
				img_list:['帮助打饭','物品挂失','经理动态'],
				img_index:0,
				dish_list:[
					{
						FoodName:"暂无上菜",
						FoodPicture:"../../static/icon/1-8p/Image4.png",
						Floor:"一",
						Window:"1",
						Praise:23,
						Comment:20,
						Introduction:"暂无菜品，请联系食堂经理上菜",
						Price:0,
						area_or_judge:0
					},
				]
			}
		},
		onLoad(e) {
			var that = this
			// console.log(e.name)
			for (var i = 0; i < this.cateen_array.length; i++) {
				if(this.cateen_array[i] == e.name){
					that.cateen_index = i
				}
			}
			console.log(rap.globalData.openid)
			that.request({
				url:"http://www.garbageclassifier.club:8080/get_food",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					area:Number(that.cateen_index) + 1,  // 改成that.cateen_index + 1
					openId:rap.globalData.openid
				}
			}).then(res=>{
				// console.log(res)
				// console.log(Date.now())
				console.log("onload:",res.data.Food)
				if(res.data.Food){
					that.dish_list = res.data.Food
				}
				for (var i=0;i<that.dish_list.length;i++){
					if(that.dish_list[i].Praise>999){// that.dish_list[i].Comment>999
						that.dish_list[i].Praise = "999+"
						that.styleO -= 5
					}else if(that.dish_list[i].Praise>99){
						that.styleO -= 5
					}
					if(that.dish_list[i].Comment>999){// that.dish_list[i].Comment>999
						that.dish_list[i].Comment = "999+"
						that.styleO -= 5
					}else if(that.dish_list[i].Comment>99){
						that.styleO -= 5
					}
					
				}
			})
			
		},
		onShow(){
			var that = this
			that.request({
				url:"http://www.garbageclassifier.club:8080/get_food",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					area:Number(that.cateen_index) + 1,  // 改成that.cateen_index + 1
					openId:rap.globalData.openid
				}
			}).then(res=>{
				// console.log(res)
				console.log("onShow:",res.data.Food)
				that.dish_list = res.data.Food
			})
			// console.log(this.dish_list)
		},
		methods: {
			picker_change:function(e){
				var that = this
				// picker相关
				// console.log(e)
				this.cateen_index = e.detail.value
				that.request({
					url:"http://www.garbageclassifier.club:8080/get_food",
					method:"POST",
					header:{
						'Content-Type' : "application/x-www-form-urlencoded"
					},
					data:{
						area:Number(that.cateen_index) + 1,  // 改成that.cateen_index + 1
						openId:rap.globalData.openid
					}
				}).then(res=>{
					// console.log(res)
					// console.log(res.data.Food)
					that.dish_list = res.data.Food
				})
			},
			click_img:function(e){
				var that = this
				// top部分相关
				this.img_index = e
				var index = Number(that.cateen_index) + 1
				// console.log(this.img_list[this.img_index])
				if(this.img_index==0){
					// 帮忙打饭
				}else if(this.img_index==1){
					// 物品挂失
					uni.navigateTo({
						url:"/pages/loss_goods/loss_goods?area=" + index
					})
				}else if(this.img_index==2){
					// 经理动态
				}
			},
			naviTo_detail:function(e){
				// console.log(e)
				// console.log(this.dish_list[e].AreaOrJudge)
				uni.setStorage({
							key:'Food_detail',
							data:{
								FoodId:this.dish_list[e].FoodId,
								FoodPicture:this.dish_list[e].FoodPicture,
								Foodlike:this.dish_list[e].Praise,
								FoodName:this.dish_list[e].FoodName,
								Price:this.dish_list[e].Price,
								area_or_judge:this.dish_list[e].AreaOrJudge==1? true : false
							}
							})
				uni.navigateTo({
					url:"../dish_detail/dish_detail?FoodId=" + this.dish_list[e].FoodId,
					success(res) {
						console.log("跳转成功")
					},
					fail(res) {
						console.log("跳转失败")
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
.all{
	.picker_name{
		margin-top: 40rpx;
		margin-left: 40rpx;
		display: flex;
		.picker_image{
			width: 45rpx;
			height: 50rpx;
			margin-right: 10rpx;
		}
		.picker_text{
			display: block;
			color: #ebb06d;
			font-weight: bold;
			font-size: 40rpx;
		}
	}
	.top_list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30rpx;
		// float: initial;
		.top_list_view_1{
			margin-left:40rpx;
			.top_list_img_1{
				width: 25vw;
			}
		}
		.top_list_view_2{
			margin-left:20rpx;
			margin-right:20rpx;
			.top_list_img_2{
				width: 25vw;
			}
		}
		.top_list_view_3{
			margin-right:40rpx;
			.top_list_img_3{
				width: 25vw;
			}
		}
	}
	.heng{
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
		.heng_img{
			width: 20vw;
			// text-align: center;
		}
	}
	
}
.dish_list {
	margin-top: 10rpx;
	padding: 10rpx 0;
	display: flex;
	border-bottom: 1px solid #cccccc;
	width: 100%;
	padding-left: 10rpx;
	padding-right: 10rpx;
  .dish_detail {
	// flex:1;
	padding:10rpx;
    image {
		width:150rpx;
	    height:150rpx;
    }
  }
  .dish_detail_head {
	  display: inline-block;
	  font-size: 25rpx;
	  color: #eaa960;
	// .dish_detail_head_text{}
  }
  .dish_text{
	  position: relative;
	  flex: 2;
	  .dish_detail_text {
		margin-top: 10rpx;
		width: 75vw;
		padding: 10rpx 10rpx;
		font-size: 24rpx;
		display: block;
		/*三行代码很重要*/ 
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		color: #9c9c9c;
	  }
	  .dish_detail_down {
		  display: inline-flex;
		  position: relative;
		  top: 20rpx;
		.dish_detail_position {
			color: #9c9c9c;
			font-size: 25rpx;
			margin-left: 20rpx;
		}
		.dish_detail_icon {
			display: inline-flex;
		  .dish_detail_rank {
			image {
				width: 40rpx;
			}
			text {
				color: #9c9c9c;
				font-size: 30rpx;
				padding-bottom: 2rpx;
			}
		  }
		  .dish_detail_pinglun {
			  margin-left: 20rpx;
			image {
				width: 40rpx;
			}
			text {
				color: #9c9c9c;
				font-size: 30rpx;
				padding-bottom: 2rpx;
			}
		  }
		}
	  }
  }
}
page{
	background-color: #FFFFFF;
}
</style>
