import config from 'config.js';
var HOST_URL = config.getHOST_URL;
const app = getApp();

	// get请求
  function	getData(url, data, Callback) {
		var that = this, headers;
		const token =  wx.getStorageSync('token')
		headers = {
			'Content-type': 'application/json;charset=utf-8'
		}
	// if(token != null) {
	// 	headers = {
	// 		'Content-type': 'application/json;charset=utf-8',
	// 		'Authorization': token
	// 	}
	// 	} else {
	// 		headers = {
	// 			'Content-type': 'application/json;charset=utf-8'
	// 		}
	// 	}
		wx.request({
			url: HOST_URL + url,
			method: 'GET',
			data: data,
			header: headers,
			complete: function(res) {
				Callback(res.data);
				// 登录
				// if (res.data.code == 500001) {
				// 	wx.navigateTo({
				// 		url: '/pages/login/index',
				// 	})
				// }
			}
		});
	}

	// get请求 promise
function getDataP(url, data) {
	var that = this, headers;
	const token =  wx.getStorageSync('token')
	if(token != null) {
		headers = {
			'content-type': 'application/json;charset=utf-8',
			'Authorization': token
		}
	} else {
		headers = {
			'content-type': 'application/json;charset=utf-8'
		}
	}
		return new Promise((reslove, reject) => {
			wx.request({
				url: HOST_URL + url,
				method: 'GET',
				data: data,
        header: headers,
				complete: function(res) {
					// 登录
					if (res.data.code == 500001) {
						wx.navigateTo({
							url: '/pages/login/index',
						})
					}
					if (res.data.code == 200000) reslove(res)
					else reject(res.data)
				}
			});
		})

	}

	// post请求
  function	postData(url, data, Callback) {
		var that = this, headers;
		const token =  wx.getStorageSync('access_token')
		headers = {
			'content-type': 'application/json;charset=utf-8'
		}
		console.log(token)
		if(token == '' ||token == null || token == undefined){
			console.log('未登陆提交')
			wx.showToast({
				title: '请先登录后再评论',
			})
			return;
		}
	// if(token != null) {
	// 	headers = {
	// 		'content-type': 'application/json;charset=utf-8',
	// 		'Authorization': token
	// 	}
	// } else {
	// 	headers = {
	// 		'content-type': 'application/json;charset=utf-8'
	// 	}
	// }
	wx.request({
			url: HOST_URL + url,
      method: 'POST',
      header: headers,
			data: data,
			dataType: 'json',
			complete: function(res) {
				Callback(res.data)
				// 登录
				// if (res.data.code == 500001) {
				// 	wx.navigateTo({
				// 		url: '/pages/login/index',
				// 	})
				// }
			}
		});
	}

	// post请求Promise
  function	postDataP(url, data) {
		var that = this, headers;
		const token =  wx.getStorageSync('access_token')
		headers = {
			'content-type': 'application/json;charset=utf-8'
		}
		console.log(token)
		if(token == null || token == undefined){
			console.log('未登陆提交')
			wx.showToast({
				title: '您尚未登录，请先登录',
			})
			return;
		}
	// if(token != null) {
	// 	headers = {
	// 		'content-type': 'application/json;charset=utf-8'
	// 		// 'Authorization': token
	// 	}
	// } else {

	// }
		return new Promise((reslove, reject) => {
			wx.request({
				url: HOST_URL + url,
				method: 'POST',
			  header: headers,
				data: data,
				dataType: 'json',
				complete: function(res) {
					// 登录
					// if (res.data.code == 500001) {
					// 	wx.navigateTo({
					// 		url: '/pages/login/index',
					// 	})
					// }
					if (res.data.code == 0) reslove(res)
					else reject(res.data)
				}
			});
		})
  }
  
	// PUT请求
  function	putData(url, data, Callback) {
		var that = this, headers;
		const token =  wx.getStorageSync('token')
	if(token != null) {
		headers = {
			'content-type': 'application/json;charset=utf-8',
			'Authorization': token
		}
	} else {
		headers = {
			'content-type': 'application/json;charset=utf-8'
		}
	}
	wx.request({
			url: HOST_URL + url,
      method: 'PUT',
      header: headers,
			data: data,
			dataType: 'json',
			complete: function(res) {
				Callback(res.data)
				// 登录
				if (res.data.code == 500001) {
					wx.navigateTo({
						url: '/pages/login/index',
					})
				}
			}
		});
	}

		// delete请求
		function deleteData(url, data, Callback) {
			var that = this, headers;
			const token =  wx.getStorageSync('token')
		if(token != null) {
			headers = {
				'content-type': 'application/json;charset=utf-8',
				'Authorization': token
			}
		} else {
			headers = {
				'content-type': 'application/json;charset=utf-8'
			}
		}
		wx.request({
				url: HOST_URL + url,
				method: 'DELETE',
				header: headers,
				data: data,
				dataType: 'json',
				complete: function(res) {
					Callback(res.data)
					// 登录
					if (res.data.code == 500001) {
						wx.navigateTo({
							url: '/pages/login/index',
						})
					}
				}
			});
		}
  module.exports = {
    getData: getData,
    getDataP: getDataP,
    postData: postData,
		postDataP: postDataP,
		putData: putData,
		deleteData: deleteData
  }