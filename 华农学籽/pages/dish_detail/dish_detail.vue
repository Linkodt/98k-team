<template>
	<view>
		<view class="top_list">
			<view class="head">
				{{Food.FoodName}}<text>{{Food.Price}}元</text>
			</view>
			<image :src="Food.FoodPicture" mode="aspectFill" class="top_list_image"></image>
			<view class="top_list_bottom">
				<view class="top_list_bottom_pinglun">
					<text>所有评论</text>
				</view>
				<view class="like" :class="{ highlight: Food.area_or_judge }">
					<u-icon v-if="!Food.area_or_judge" name="heart" :size="40" color="#9a9a9a" @click="dishLike(Food.area_or_judge)"></u-icon>
					<u-icon v-if="Food.area_or_judge" name="heart-fill" :size="40" color="#eba95f"  @click="dishLike(Food.area_or_judge)"></u-icon>
					<view class="num">{{Food.Foodlike}}</view>
				</view>
			</view>
		</view>
		<!-- 评论列表开始 -->
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left"><image :src="res.url" mode="widthFix"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30"  @click="getLike(index)"></u-icon>
						<view class="num">{{ res.likeNum }}</view>
					</view>
				</view>
				<view class="content">{{ res.contentText }}</view>
				<!-- <view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view> -->
				<view class="bottom">
					{{ res.date }}
					<!-- <view class="reply">回复</view> -->
				</view>
			</view>
		</view>
		<!-- 评论列表结束 -->
		<!-- 底部评论栏开始 -->
		<view class="footer" :class="{ footer_bottom: !isbottom }" >
			<view class="footer_center">
				<u-icon name="chat-fill" :size="40" color="#eaa960" ></u-icon>
				<input type="text" placeholder="写评论" placeholder-class="footer_center_input_placeholder" class="footer_center_input" @confirm="sendPL()" confirm-type="send" v-model="content" />
				<text class="footer_center_text" @click="sendPL()"  >发送</text>
			</view>
		</view>
		<!-- 底部评论栏结束 -->
	</view>
</template>

<script>
	var rap = getApp()
	import moment from "moment"
export default {
	data() {
		return {
			commentList: [
			],
			Food:{
				FoodName:"麻辣烫",
				FoodId:null,
				FoodPicture:"../../static/icon/1-8p/Image4.png",
				Foodlike:20,
				Price:12,
				area_or_judge:false
			},
			isLike:false,
			// 评论栏是否到底
			isbottom:false,
			FoodId:null,
			content:"",
			// Code:null
		};
	},
	onLoad(e) {
		var that = this
		console.log(e.FoodId)
		uni.getStorage({
			key:"Food_detail",
			success:(res)=>{
				console.log(res)
				that.Food = res.data
			}
		})
		this.FoodId = Number(e.FoodId)
		this.getComment(Number(e.FoodId));
	},
	methods: {
		// 点赞评论
		getLike(index) {
			var that = this
			// console.log(index)  //  0 1 2 3
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
			that.request({
				url:"http://www.garbageclassifier.club:8080/comment_praise",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					commentId:this.commentList[index].CommentId,
					openId:rap.globalData.openid
				}
			})
		},
		// 点赞菜
		dishLike(area_or_judge){
			var that = this
			// console.log(area_or_judge)
			this.onpresscTime = Date.now()
			if(!area_or_judge){
				// 点赞逻辑
				++that.Food.Foodlike
			}else{
				// 取消点赞逻辑
				--that.Food.Foodlike
				}
				console.log(typeof(Number(that.FoodId)))
				console.log(rap.globalData.openid)
			that.request({
				url:"http://www.garbageclassifier.club:8080/food_praise",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					foodId:Number(that.FoodId),
					openId:rap.globalData.openid
				}
			}).then(res=>{
				console.log(res)
			})
			that.Food.area_or_judge = !that.Food.area_or_judge
		},
		// 评论列表
		getComment(e) {
			var that = this
			// console.log(e)
			// console.log(rap.globalData.openid)
			that.getPL(e)
		},
		// 发表评论
		sendPL(){
			var that = this
			// console.log(that.content)
			// console.log(typeof(that.FoodId))
			if(that.content.length<=120)
			{
				that.request({
					url:"http://www.garbageclassifier.club:8080/post_comment",
					method:"POST",
					header:{
						'Content-Type' : "application/x-www-form-urlencoded"
					},
					data:{
						foodId:Number(that.FoodId),
						content:that.content,
						openId:rap.globalData.openid
					}
				}).then(res=>{
					that.content = ""
					// that.Code = res.data.Code
					console.log(res)
					if(res.data.Code==401){
						uni.showToast({
							title:"评论超过2次",
							icon:"none",
							duration:2000
						})
					}else if(res.data.Code==200){
						uni.showToast({
							title:"评论成功",
							icon:"none",
							duration:2000
						})
					}
					// 已经发过请求了
					// 获取列表
					that.getPL(Number(that.FoodId))
				})
			}else{
				uni.showToast({
					title:"输入文字过长，重新输入",
					icon:"none"
				})
			}
		},
		// 获取评论的函数封装
		getPL(e){
			var that = this
			that.request({
				url:"http://www.garbageclassifier.club:8080/get_comment",
				method:"POST",
				header:{
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				data:{
					foodId:e,
					openId:rap.globalData.openid
				}
			}).then(res=>{
				that.commentList = []
				console.log(res.data.Comment)
				// 解析数据
				for(var i=0;i<res.data.Comment.length;i++)
				{
					var day = moment.unix(res.data.Comment[i].Time).format("YYYY/MMM/D-k:m")
					var data = {
						name:res.data.Comment[i].CommentUser.Name,
						// date 时间戳
						date:day,
						contentText:res.data.Comment[i].Content,
						url:res.data.Comment[i].CommentUser.Picture,
						likeNum:res.data.Comment[i].Praise,
						isLike:res.data.Comment[i].Judge==1?true:false,
						CommentId:res.data.Comment[i].CommentId
					}
					that.commentList.push(data)
				}
				
			})
		}
	},
	onReachBottom() {
		this.isbottom=true
	}
};
</script>

<style lang="scss">
.top_list {
		// display: flex;
		padding-left: 5vw;
		padding-top: 10rpx;
		border-bottom: 0.5px solid #E5E5E5;
		padding-bottom: 20rpx;
	  .head {
		  font-size: 35rpx;
		  font-weight: bold;
		  color:#eba95f;
		  margin-bottom: 15rpx;
	    text {
			font-weight: normal;
			text-align: center;
			font-size: 25rpx;
			padding-left: 10rpx;
			padding-right: 10rpx;
			margin-left: 20rpx;
			border-radius: 5rpx 5rpx 5rpx 5rpx;
			background-color: #fbeedf;
	    }
	  }
	
	  .top_list_image {
		width: 90vw;
		height: 400rpx;
	  }
	
	  .top_list_bottom {
		  display: flex;
		  margin-top: 20rpx;
	    .top_list_bottom_pinglun {
			// justify-content: flex-start;
			display: block;
			text{
				margin-top: 10rpx;
				font-size: 35rpx;
				font-weight: bold;
			}
	    }
	
	    .like {
	    	display: flex;
	    	align-items: center;
	    	color: #9a9a9a;
	    	font-size: 35rpx;
			margin-left: 57vw;
	    	.num {
	    		margin-right: 4rpx;
	    		color: #9a9a9a;
	    	}
	    }
	    .highlight {
	    	color: #eba95f;
	    	.num {
				margin-right: 4rpx;
	    		color: #eba95f;
	    	}
	    }
	  }
	}
.comment {
	display: flex;
	padding: 30rpx;
	border-bottom:0.5px solid #dadada;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				font-size: 28rpx;
				color: #888888;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 30rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #eba95f;
				.num {
					color: #eba95f;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
			font-size: 25rpx;
		}
		// .reply-box {
		// 	background-color: rgb(242, 242, 242);
		// 	border-radius: 12rpx;
		// 	.item {
		// 		padding: 20rpx;
		// 		border-bottom: solid 2rpx $u-border-color;
		// 		.username {
		// 			font-size: 24rpx;
		// 			color: #999999;
		// 		}
		// 	}
		// 	.all-reply {
		// 		padding: 20rpx;
		// 		display: flex;
		// 		color: #5677fc;
		// 		align-items: center;
		// 		.more {
		// 			margin-left: 6rpx;
		// 		}
		// 	}
		// }
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			// .reply {
			// 	color: #5677fc;
			// 	margin-left: 10rpx;
			// }
		}
	}
}
.footer {
            // left: 0px;
			border-top: 0.2px solid #dadada;
            bottom: 0px;
            width: 100%;
            height: 50px;
            background-color: #FFFFFF;
            z-index: 9999;
			.footer_center{
				display: inline-flex;
				align-items: center;
				background-color: #fbeedf;
				margin-top: 6px;
				margin-left: 5vw;
				padding-left: 20rpx;
				padding-right: 20rpx;
				padding-bottom:10rpx;
				padding-top:20rpx;
				.footer_center_input{
					margin-left: 5vw;
					color: #eaa960;
					width: 65vw;
				}
				.footer_center_input_placeholder{
					color: #f4d4ae;
					font-size: 20rpx;
				}
				.footer_center_text{
					margin-left: 20rpx;
					color: #FFFFFF;
					background-color: #eaa960;
					font-size: 25rpx;
					text-align: center;
					padding-left:10rpx;
					padding-right: 10rpx;
					padding-top: 5rpx;
					padding-bottom: 5rpx;
					border-radius: 20rpx 20rpx 20rpx 20rpx;
				}
			}
        }
.footer_bottom{
	position: fixed;
}
page{
	background-color: #ffffff;
}
</style>