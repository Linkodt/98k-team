<template>
	<view>
		<u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType" >
				<u-form-item label="姓名" :label-style="label_style" label-position="top" prop="name" ><u-input :border="true" :custom-style="input_style" v-model="form.name" placeholder="必填" /></u-form-item>
				<u-form-item label="手机号码" :label-style="label_style" label-position="top" prop="connect" ><u-input type="number" :border="true" :custom-style="input_style" v-model="form.connect"   placeholder="必填" /></u-form-item>
				<u-form-item label="物品特征" :label-style="label_style" label-position="top" prop="intro" ><u-input :height="'150'" :border="true" :custom-style="input_style" type="textarea" v-model="form.intro"  placeholder="必填" /></u-form-item>
				<u-form-item label-position="top" label="物品图片"  :label-style="label_style" prop="photo" label-width="150">
					<u-upload :show-tips="false" width="160" @on-choose-complete="onChoose" :file-list="filesArr" max-count="1" :auto-upload="false" ></u-upload>
				</u-form-item>
				<u-button style="margin-left: 35vw;" @click="suBmit" :custom-style="customStyle" ripple-bg-color="rgba(250, 237, 222, 1.0)" size="medium"   :plain="false" :ripple="true" >发布</u-button>
		</u-form>
	</view>
</template>

<script>
	var rap = getApp()
	export default {
		data() {
			return {
				form: {
						name: '',
						intro: '',
						connect: ''
					},
				filesArr:[
				],
				input_style:{
					"background-color":"#fdfdfd",
					// "width":"70vw"
					// "border":"0.5px solid #e5e5e5"
				},
				label_style:{
					"font-size":"30rpx",
					"font-weight":"bold"
				},
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#eaa960'
				},
				errorType: ['message'],
				rules: {
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur' ,
						},
						{
							min: 2,
							max: 5,
							message: '姓名长度在2到5个字符',
							trigger: ['change','blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						},
					],
					connect: [
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
					"intro":[
						{
							required: true,
							message: '请填写简介'
						},
						{
							min: 5,
							message: '简介不能少于5个字',
							trigger: 'change' ,
						}
					]
				}
				
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			onChoose(lists) {
						this.filesArr = lists;
					},
			suBmit(e){
				// this.$refs.uUpload.upload();
				var that = this
				// console.log(this.filesArr[0].url)
				if(!this.filesArr[0].url){
					wx.showToast({
						title:"请上传图片",
						icon:"none"
					})
				}
				else if(that.form.name==''){
					wx.showToast({
						title:"请填写用户名",
						icon:"none"
					})
				}else if(that.form.intro==''){
					wx.showToast({
						title:"请填写简介",
						icon:"none"
					})
				}else if(that.form.connect==''){
					wx.showToast({
						title:"请填写手机号码",
						icon:"none"
					})
				}else{
					that.dao.postObject(this.filesArr[0].url,function(err,data){
						console.log(err || data)
						if(!err){
							let src = data.Location
							// console.log(data.Location)
							that.request({
								url:"http://www.garbageclassifier.club:8080/post_loss",
								method:"POST",
								header:{
									'Content-Type' : "application/x-www-form-urlencoded"
								},
								data:{
									area:rap.globalData.area,
									picture:data.Location,
									phone:that.form.connect,
									openId:rap.globalData.openid,
									introduction:that.form.intro,
									name:that.form.name
								}
							}).then(res=>{
								console.log(res)
								if(res.data.Code==200)
								{
									wx.showToast({
									title:"发布成功",
									icon:"none"
									})
								that.form.name = '',
								that.form.intro = '',
								that.form.connect = ''
								}else if(res.data.Code==400){
									wx.showToast({
										title:"发布失败",
										icon:"none"
									})
								}
							})
						}
					})
					// console.log(that.form.name)
					// console.log(that.form.intro)
					// console.log(that.form.connect)
				}

			}
		}
	}
</script>

<style lang="scss" >
page{
	background-color: #FFFFFF;
}
</style>
