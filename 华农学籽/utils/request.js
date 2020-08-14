/*
	封装uni.request方法，实现异步效果
	使用方法:
		this.request({
			url:"",
			methods:"",
			data:{
				key:value,
			}
		}).then(res=>{
			// res为请求返回的结果
		})
*/
// ES6
export default (params)=>{
	// 加载中
	return new Promise((resolve,reject)=>{
		wx.request({
			...params,
			success(res){
				resolve(res);
			},
			fail(err){
				reject(err);
			},
			complete(){

			}
		})
	})
}