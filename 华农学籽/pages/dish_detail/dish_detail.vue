<template>
	<view>
		<view class="top_list">
			<view class="head">
				炸酱面<text>12元</text>
			</view>
			<image src="../../static/icon/1-8p/Image4.png" mode="aspectFill" class="top_list_image"></image>
			<view class="top_list_bottom">
				<view class="top_list_bottom_pinglun">
					<text>所有评论</text>
				</view>
				<view class="like" :class="{ highlight: isLike }">
					<u-icon v-if="!isLike" name="heart" :size="40" color="#9a9a9a" @click="changeLike(index)"></u-icon>
					<u-icon v-if="isLike" name="heart-fill" :size="40" @click="changeLike(index)"></u-icon>
					<view class="num">{{isNum}}</view>
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
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
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
				<input type="text" placeholder="写评论" placeholder-class="footer_center_input_placeholder" value="" class="footer_center_input" />
				<text class="footer_center_text" >发送</text>
			</view>
		</view>
		<!-- 底部评论栏结束 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			commentList: [],
			isLike:false,
			isNum:23,
			isbottom:false
		};
	},
	onLoad() {
		this.getComment();
	},
	methods: {
		// 点赞
		getLike(index) {
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
		},
		// 评论列表
		getComment() {
			this.commentList = [
				{
					id: 1,
					name: '可达鸭小团队',
					date: '12-25 18:58',
					contentText: '太好吃了呜呜呜呜，太好吃了呜呜呜呜太好吃了呜呜呜呜，太好吃了呜呜呜呜',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					likeNum: 33,
					isLike: false,
				},
				{
					id: 2,
					name: '可达鸭小团队',
					date: '01-25 13:58',
					contentText: '太好吃了2333太好吃了2333，太好吃了2333太好吃了2333，太好吃了2333',
					allReply: 0,
					likeNum: 11,
					isLike: false,
					url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
				},
				{
					id: 3,
					name: '可达鸭小团队',
					date: '03-25 13:58',
					contentText: '我不信有这么好吃',
					likeNum: 21,
					isLike: false,				
					url: '../../static/icon/1-8p/459.png',
				},
				{
					id: 4,
					name: '可达鸭小团队',
					date: '06-20 13:58',
					contentText: '真的假的?',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					likeNum: 150,
					isLike: false
				}
			];
		},
		changeLike(index){
			this.isLike = !this.isLike;			
			console.log(this.isLike)
			if (this.isLike == true) {
				this.isNum++;
			} else {
				this.isNum--;
			}
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
				font-size: 40rpx;
				font-weight: bold;
			}
	    }
	
	    .like {
	    	display: flex;
	    	align-items: center;
	    	color: #9a9a9a;
	    	font-size: 40rpx;
			margin-left: 60vw;
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
