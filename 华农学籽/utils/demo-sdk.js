var COS = require('./cos-wx-sdk-v5');

var config = {
    Bucket: 'haibobo-1259500678',
    Region: 'ap-nanjing'
};

var TaskId;
var cos = new COS({
    SecretId: 'AKIDWpvyrUmwjSxDEytkETTFm35tUw91tU3N',
    SecretKey: 'ECvPgjV9XpGTP6W5OQFuKYXHNOCn8D4l',
});

// var cos = new COS({
//     getAuthorization: function (options, callback) {
//         wx.request({
//             method: 'GET',
//             url: 'http://localhost:8080/get', // 服务端签名，参考 server 目录下的两个签名例子
//             dataType: 'json',
//             success: function (result) {
//                 var data = result.data;
//                 callback({
//                     TmpSecretId: data.credentials && data.credentials.tmpSecretId,
//                     TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
//                     XCosSecurityToken: data.credentials && data.credentials.sessionToken,
//                     ExpiredTime: data.expiredTime,
//                 });
//                 console.log(result)
//                 console.log(data)
//             }
//         });
//     },
// });

// 回调统一处理函数
var requestCallback =function (err, data) {
    console.log(err || data);
    if (err && err.error) {
        wx.showModal({title: '返回错误', content: '请求失败：' + (err.error.Message || err.error) + '；状态码：' + err.statusCode, showCancel: false});
    } else if (err) {
        wx.showModal({title: '请求出错', content: '请求出错：' + err + '；状态码：' + err.statusCode, showCancel: false});
    } else {
        wx.showToast({title: '请求成功', icon: 'success', duration: 3000});
    }
};

// 展示的所有接口
var dao = {
    // Service
    getService: function () {
        cos.getService(requestCallback);
    },
    // Bucket
    putBucket: function () {
        cos.putBucket({
            Bucket: 'testnew-' + config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1),
            Region: 'ap-guangzhou'
        }, requestCallback);
    },
    getBucket: function () {
        cos.getBucket({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    headBucket: function () {
        cos.headBucket({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    deleteBucket: function () {
        cos.deleteBucket({
            Bucket: 'testnew-' + config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1),
            Region: 'ap-guangzhou'
        }, requestCallback);
    },
    getBucketACL: function () {
        cos.getBucketAcl({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    putBucketACL: function () {
        cos.putBucketAcl({Bucket: config.Bucket, Region: config.Region, ACL: 'public-read'}, requestCallback);
    },
    getBucketCors: function () {
        cos.getBucketCors({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    putBucketCors: function () {
        cos.putBucketCors({Bucket: config.Bucket, Region: config.Region,
            CORSRules: [{
                "AllowedOrigin": ["*"],
                "AllowedMethod": ["GET", "POST", "PUT", "DELETE", "HEAD"],
                "AllowedHeader": ["*"],
                "ExposeHeader": ["ETag"],
                "MaxAgeSeconds": "5"
            }]
        }, requestCallback);
    },
    putBucketPolicy: function () {
        var AppId = config.Bucket.substr(config.Bucket.lastIndexOf('-') + 1);
        cos.putBucketPolicy({Bucket: config.Bucket, Region: config.Region,
            Policy: {
                "version": "2.0",
                "principal": {"qcs": ["qcs::cam::uin/10001:uin/10001"]}, // 这里的 10001 是 QQ 号
                "statement": [
                    {
                        "effect": "allow",
                        "action": [
                            "name/cos:GetBucket",
                            "name/cos:PutObject",
                            "name/cos:PostObject",
                            "name/cos:PutObjectCopy",
                            "name/cos:InitiateMultipartUpload",
                            "name/cos:UploadPart",
                            "name/cos:UploadPartCopy",
                            "name/cos:CompleteMultipartUpload",
                            "name/cos:AbortMultipartUpload",
                            "name/cos:AppendObject"
                        ],
                        // "resource": ["qcs::cos:ap-guangzhou:uid/1250000000:test-1250000000/*"] // 1250000000 是 appid
                        "resource": ["qcs::cos:" + config.Region + ":uid/" + AppId + ":" + config.Bucket + "/*"] // 1250000000 是 appid
                    }
                ]
            },
        }, requestCallback);
    },
    deleteBucketCORS: function () {
        console.log(config.Bucket)
        cos.deleteBucketCors({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    getBucketLocation: function () {
        cos.getBucketLocation({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    getBucketPolicy: function () {
        cos.getBucketPolicy({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    getBucketTagging: function () {
        cos.getBucketTagging({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    putBucketTagging: function () {
        cos.putBucketTagging({
            Bucket: config.Bucket, Region: config.Region,
            Tagging: {
                "Tags": [
                    {"Key": "k1", "Value": "v1"},
                    {"Key": "k2", "Value": "v2"}
                ]
            }
        }, requestCallback);
    },
    deleteBucketTagging: function () {
        cos.deleteBucketTagging({Bucket: config.Bucket, Region: config.Region}, requestCallback);
    },
    // Object
    putObject: function () {
        cos.putObject({
            Bucket: config.Bucket,
            Region: config.Region,
            Key: '1.txt',
            Body: 'hello world' // 在小程序里，putObject 接口只允许传字符串的内容，不支持 TaskReady 和 onProgress，上传请使用 cos.postObject 接口
        }, requestCallback);
    },
    getObject: function () {
        cos.getObject({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, requestCallback);
    },
    headObject: function () {
        cos.headObject({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, requestCallback);
    },
    deleteObject: function (key,func) {
       
        cos.deleteObject({Bucket: config.Bucket, Region: config.Region, Key: key}, func);
    },
    getObjectACL: function () {
        cos.getObjectAcl({Bucket: config.Bucket, Region: config.Region, Key: '1.txt'}, requestCallback);
    },
    putObjectACL: function () {
        cos.putObjectAcl({
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: '1.txt',
            // GrantFullControl: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
            // GrantWrite: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
            // GrantRead: 'id="qcs::cam::uin/1001:uin/1001",id="qcs::cam::uin/1002:uin/1002"',
            // ACL: 'public-read-write',
            // ACL: 'public-read',
            // ACL: 'private',
            ACL: 'default', // 继承上一级目录权限
            // AccessControlPolicy: {
            //     "Owner": { // AccessControlPolicy 里必须有 owner
            //         "ID": 'qcs::cam::uin/459000000:uin/459000000' // 459000000 是 Bucket 所属用户的 QQ 号
            //     },
            //     "Grants": [{
            //         "Grantee": {
            //             "ID": "qcs::cam::uin/10002:uin/10002", // 10002 是 QQ 号
            //         },
            //         "Permission": "READ"
            //     }]
            // }
        }, requestCallback);
    },
    putObjectCopy: function () {
        cos.putObjectCopy({
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: '1.copy.txt',
            CopySource: config.Bucket + '.cos.' + config.Region + '.myqcloud.com/1.txt',
        }, requestCallback);
    },
    // 上传文件
    postObject: function (filePath,func) {
		//func 是回调函数，我们可以传递一个自定义回调函数
		//生成图片的唯一标识符，这个唯一标符将作为图片的key
		let type=filePath.substr(filePath.lastIndexOf('.') + 1);     //获取文件后缀
		let key=this.createUuid()+'.'+type;
		console.log(key)
		cos.postObject({
		    Bucket: config.Bucket, Region: config.Region, Key: key,
		    FilePath:filePath,
		    TaskReady: function (taskId) {
		        TaskId = taskId
		    },
		    onProgress: function (info) {
		        console.log(JSON.stringify(info));
		    }
		}, func);
    },
    cancelTask: function() {
        cos.cancelTask(TaskId);
        console.log('canceled');
    },
    pauseTask: function() {
        cos.pauseTask(TaskId);
        console.log('paused');
    },
    restartTask: function() {
        cos.restartTask(TaskId);
        console.log('restart');
    },
	createUuid:function(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";
		var uuid = s.join("");
		return uuid;
	}
};

module.exports = dao;