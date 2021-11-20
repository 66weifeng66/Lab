// pages/login/index.js
import {getData,getDatap,postData,postDataP} from '../../utils/request.js'
import {giteeUser} from '../../utils/gitee.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password: ''
  },
  register: function() {
    wx.navigateTo({
      url: '/pages/register/index',
    })
  },
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  submit:function (){
    if(that.data.username === ''){
      wx.showToast({
        title: '用户名不能为空',
        icon:'none'
      })
      return
    } else  if(that.data.password === ''){
      wx.showToast({
        title: '密码不能为空',
        icon:'none'
      })
      return
    }
    const user = {
      'username': that.data.username,
      'password': that.data.password
    }
    // gitee登录
    giteeUser(that.data.username,that.data.password, res =>{
        wx.setStorageSync('username', that.data.username)
        wx.setStorageSync('access_token', res.data.access_token)
        wx.setStorageSync('token_type', res.data.token_type)
        wx.setStorageSync('refresh_token', res.data.refresh_token)
        app.globalData.username = this.data.username
        app.globalData.access_token =  res.data.access_token
        app.globalData.refresh_token =  res.data.refresh_token
        wx.navigateBack({
          delta: 1,
        })
    })
    return
    postData('user/login', JSON.stringify(user), res => {
      console.log(res)
      if(res.code === 200000){
        wx.setStorage({
          data: res.data,
          key: 'token',
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 5000,
          success: function(){
            wx.navigateBack({
              delta: 0,
            })
            // wx.navigateTo({
            //   url: '/pages/index/index',
            // })
          }
        })
      } else if(res.code === 500003) {
        wx.showToast({
          title: '用户不存在，请检查后再输入'
        })
      } else if(res.code === 500004) {
        wx.showToast({
          title: '用户密码错误'
        })
      } else {
        wx.showToast({
          title: '登录失败，请联系管理员'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})