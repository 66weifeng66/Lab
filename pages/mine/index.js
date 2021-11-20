// pages/mine/index.js
import {getData,getDatap,postData,postDataP} from '../../utils/request.js'
import {giteeUser,giteeUserInfo} from '../../utils/gitee.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    avatar_url: null
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    if(this.data.username == null) {
      const access_token =  wx.getStorageSync('access_token')
      if(access_token != null && access_token != '') {
        giteeUserInfo(res => {
          if(res.statusCode === 200) {
            app.globalData.username = res.data.name
            that.setData({
              username: res.data.name,
              avatar_url: res.data.avatar_url
            })
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  logout: function() {
    wx.setStorageSync('token', null)
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  login: function() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
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