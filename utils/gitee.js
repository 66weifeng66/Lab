import config from 'config.js';
const app = getApp();
const baseurl ="https://gitee.com";
const client_id = '08b0100b573278cebf2e9a5110454559ba79cb5bc943779a3fc9420adbbc8015';
const client_secret = '1944e105df68fca28f9ad142e5ef43a6d74d1ef77bd4fe14e43c09ac7f94f51f'

	// get请求
  function	giteeUser(username,pass, Callback) {
    var that = this, headers;
		headers = {
			'Content-type': 'application/x-www-form-urlencoded',
		}
		wx.request({
			url: baseurl + '/oauth/token',
			method: 'post',
			data: {
        'grant_type': 'password',
        'username':username,
        'password': pass,
        'client_id':client_id,
        'client_secret': client_secret,
        'scope': 'user_info projects pull_requests issues notes keys hook groups'
      },
			header: headers,
			complete: function(res) {
        console.log(res)
				// 登录
				if (res.statusCode == 200) {
          wx.showToast({
            title: 'gitee账号登录成功',
            icon: 'success'
          })
          Callback(res);
        } else {
          wx.showToast({
            title: 'gitee账号或密码错误',
            icon: 'error'
          })
        }
			}
		});
  }
  
  	// get请求用户信息
    function	giteeUserInfo(Callback) {
      var that = this, headers;
      console.log(app.globalData.access_token)
      const token = wx.getStorageSync('access_token')
      headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      }
      wx.request({
        url: baseurl + '/api/v5/user',
        method: 'get',
        data: {
          'access_token': token
        },
        header: headers,
        complete: function(res) {
          console.log(res)
          if (res.statusCode != 200) {
            wx.navigateTo({
              url: '/pages/login/index',
            })
          } else {
            Callback(res);
          }
        }
      });
    }
  	// get查询gitee库
    function	giteeSearch(q,page,per_page, Callback) {
      var that = this, headers;
      headers = {
        'Content-type': 'application/x-www-form-urlencoded',
      }
      wx.request({
        url: 'https://gitee.com/api/v5/search/repositories',
        method: 'get',
        data: {
          'q': q,
          'page': page,
          'per_page': per_page,
          'order': 'desc'
        },
        header: headers,
        complete: function(res) {
          console.log(res)
          if(res.statusCode == 200){
            Callback(res);
          } else {
            res.code = 500
            Callback(res);
          }
        }
      });
    }
// get查询gitee个人库
function	giteePersonalRepository(q,page,per_page, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
  if(q != ''){
    data = {
      'q': q,
      'page': page,
      'per_page': per_page,
      'sort': 'full_name',
      'access_token': token
    }
  } else {
    data = {
      'page': page,
      'per_page': per_page,
      'sort': 'full_name',
      'access_token': token
    }
  }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/user/repos',
    method: 'get',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 200){
        Callback(res);
      } else {
        res.code = 500
        Callback(res);
      }
    }
  });
}
// get查询gitee个人某个指定仓库
function	giteePerRepository(owner,repo, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
    data = {
      'access_token': token
    }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/repos/' + owner + '/' + repo,
    method: 'get',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 200){
        Callback(res);
      } else {
        wx.showToast({
          title: '出现未知错误',
          icon: 'error'
        })
      }
    }
  });
}
// get查询gitee某个仓库分支的目录tree 默认master分支
function	giteeBreachRepository(owner,repo,sha, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
    data = {
      'access_token': token
    }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/repos/' + owner + '/' + repo + '/git/trees/' + sha,
    method: 'get',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 200){
        Callback(res);
      } else if(res.statusCode == 404){
        Callback(res);
      }else if(res.statusCode == 401){
        wx.showToast({
          title: '您尚未登录Gitee',
          icon: 'error'
        })
        Callback(res);
      } else {
        wx.showToast({
          title: '出现未知错误',
          icon: 'error'
        })
      }
    }
  });
}
//  https://gitee.com/api/v5/repos/{owner}/{repo}/git/blobs/{sha}
// get查询gitee某个仓库分支的某个文件内容
function	giteeBlobsRepository(owner,repo,sha, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
    data = {
      'access_token': token
    }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/repos/' + owner + '/' + repo + '/git/blobs/' + sha,
    method: 'get',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 200){
        Callback(res);
      } else {
        wx.showToast({
          title: '出现未知错误',
          icon: 'error'
        })
      }
    }
  });
}
// https://gitee.com/api/v5/repos/{owner}/{repo}/contents(/{path}
// 获取仓库具体路径下的内容
function	giteeRepoSomeContent(owner,repo,path, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
    data = {
      'access_token': token
    }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/repos/' + owner + '/' + repo + '/contents/' + path,
    method: 'get',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 200){
        Callback(res);
      } else {
        wx.showToast({
          title: '获取内容失败',
          icon: 'error'
        })
      }
    }
  });
}
// 新建文件
function	giteeRepoNewFile(owner,repo,path,content,message, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
    data = {
      'access_token': token,
      "content": content,
      "message":message
    }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/repos/' + owner + '/' + repo + '/contents/' + path,
    method: 'POST',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 201){
        Callback(res);
      } else {
        wx.showToast({
          title: '出现未知错误',
          icon: 'error'
        })
      }
    }
  });
}
// 新建仓库
function	giteeBuildRepo(data, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
  data.access_token = token
    // data = {
    //   'access_token': token,
    //   "content": content,
    //   "message":message
    // }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/user/repos',
    method: 'POST',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 201){
        Callback(res);
      } else {
        wx.showToast({
          title: '出现未知错误',
          icon: 'error'
        })
      }
    }
  });
}
// 新建仓库保护分支策略
function	giteeBreachSetting(owner,repo,wildcard, Callback) {
  var that = this, headers,data;
  const token = wx.getStorageSync('access_token')
    data = {
      'access_token': token,
      "wildcard":wildcard,
      'pusher': 'admin',
      'merger': 'admin'
    }
  headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  }
  wx.request({
    url: 'https://gitee.com/api/v5/repos/' + owner + '/' + repo + '/branches/setting/new',
    method: 'put',
    data,
    header: headers,
    complete: function(res) {
      console.log(res)
      if(res.statusCode == 200){
        Callback(res);
      } else {
        wx.showToast({
          title: '出现未知错误',
          icon: 'error'
        })
      }
    }
  });
}
  module.exports = {
    giteeUser: giteeUser,
    giteeUserInfo: giteeUserInfo,
    giteeSearch:giteeSearch,
    giteePersonalRepository:giteePersonalRepository,
    giteeBreachRepository:giteeBreachRepository,
    giteeBlobsRepository:giteeBlobsRepository,
    giteeRepoSomeContent:giteeRepoSomeContent,
    giteeRepoNewFile,
    giteeBuildRepo,
    giteeBreachSetting
  }