import config from 'config.js';
var HOST_URL = config.getHOST_URL;
const app = getApp();
//微信登录
 function wxLogin() {
  wx.login({
    success: res => {
      //     发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //发起网络请求
        console.log("开始请求登陆");
        wx.request({
          url: HOST_URL + '/login.do',
          data: {
            code: res.code
          },
          method: 'get',
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res)
            var result = JSON.stringify(res.data);
            var token = res.data;
            console.log("用户认证：" + token.sessionId);
            console.log("状态值：" + token.errCode);
            //用户尚未进行认证注册
            if (token.errCode == 300) {
              wx.redirectTo({
                url: '/pages/identification/identification',   //跳转到用户授权认证登陆界面
              })
            } else if (token.errCode == 0) {
              //用户正常且已认证
              wx.setStorageSync("sessionId", token.sessionId);
              app.globalData.sessionId = token.sessionId;    //假如用户清楚缓存则会导致sessionID被临时清理掉
              app.globalData.errCode = token.errCode;
              wx.switchTab({
                url: '/pages/home/home',
              })

            } else if (token.errCode == 500) {
              console.log('服务器异常，暂时无法访问')
              wx.showToast({
                title: '服务器异常，请稍后重试',
                mask: true,
                duration: 2000
              })
            }
          },
          fail: function (res) { }
        })
      }
    }
  })
}
//微信异常处理
 function reWxLogin(errCode) {

  if (errCode == 900) {
    console.log('非法用户')
  } else if (errCode == 100) {      //用户登录身份被清除或第一次登录，重新登录
    //第一次登录，验证
    wxLogin();
  } else if (errCode == 400) {
    //服务器异常，重新验证
    wxLogin();
  } else if (errCode == 0) {
    //用户跳转到当前页面
    console.log('进入小程序')
    //正常进入小程序 '/pages/home/home'
    wx.switchTab({
      url: '/pages/home/home',
    })
    console.log('进入小程序')
  }
}
//重新获取sessionId
function reGetSesion(errCode){
  if (errCode == 900) {
    console.log('非法用户')
  } else if (errCode == 100) {      //用户登录身份被清除或第一次登录，重新登录
    //第一次登录，验证
    wx.login({
      success: res => {
        //     发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          console.log("开始请求登陆");
          wx.request({
            url: HOST_URL + '/login.do',
            data: {
              code: res.code
            },
            method: 'get',
            header: {
              'Authorization': 'Bearer ',
              'content-type': 'application/json'
            },
            success: res => {
              wx.setStorageSync("sessionId", res.data.sessionId);
              app.globalData.sessionId = res.data.sessionId;    //假如用户清楚缓存则会导致sessionID被临时清理掉
              app.globalData.errCode = res.data.errCode;
             
            }
          })
        }
      }
    })
    return errCode;
  } else if (errCode == 400) {
    //服务器异常，重新验证
    wx.login({
      success: res => {
        //     发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          console.log("开始请求登陆");
          wx.request({
            url: HOST_URL + '/login.do',
            data: {
              code: res.code
            },
            method: 'get',
            header: {
              'Authorization': 'Bearer ',
              'content-type': 'application/json'
            },
            success: res => {
              wx.setStorageSync("sessionId", res.data.sessionId);
              app.globalData.sessionId = res.data.sessionId;    //假如用户清楚缓存则会导致sessionID被临时清理掉
              app.globalData.errCode = res.data.errCode;
              
            }
          })
        }
      }
    })
    return errCode;
  } else if (errCode == 0) {
    return errCode;
  }
}
module.exports = {
  reWxLogin: reWxLogin,
  reGetSesion: reGetSesion
}
