<template>
	<view>
		<u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType" >
				<u-form-item label="姓名" :label-style="label_style" label-position="top" prop="name" ><u-input :border="true" :custom-style="input_style" v-model="form.name" placeholder="必填" /></u-form-item>
				<u-form-item label="手机号码" :label-style="label_style" label-position="top" prop="connect" ><u-input type="number" :border="true" :custom-style="input_style" v-model="form.connect"   placeholder="必填" /></u-form-item>
				<u-form-item label="物品特征" :label-style="label_style" label-position="top" prop="intro" ><u-input :height="'150'" :border="true" :custom-style="input_style" type="textarea" v-model="form.intro"  placeholder="必填" /></u-form-item>
				<u-form-item label-position="top" label="物品图片"  :label-style="label_style" prop="photo" label-width="150">
					<u-upload width="160" @on-choose-complete="onChoose" :file-list="filesArr" max-count="1" :auto-upload="false" ></u-upload>
				</u-form-item>
				<u-button class="button" @click="suBmit" :custom-style="customStyle" ripple-bg-color="rgba(250, 237, 222, 1.0)" size="medium"   :plain="false" :ripple="true" >发布</u-button>
		</u-form>
	</view>
</template>

<script>
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
							min: 3,
							max: 5,
							message: '姓名长度在3到5个字符',
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
				console.log(this.filesArr)
			}
		}
	}
</script>

<style lang="scss" >
page{
	background-color: #FFFFFF;
}
.button{
	left: 35vw;
}
</style>
