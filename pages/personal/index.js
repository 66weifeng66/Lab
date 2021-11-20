// pages/personal/index.js
import {getData,getDatap,postData,putData} from '../../utils/request.js'
import {giteeUserInfo} from '../../utils/gitee.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexIndex: 0,
    sex: ['男', '女'],
    userId: '',
    blog: '',
    weibo: '',
    avatar_url: '',
    username: '',
    stared: '',
    watched: ''
  },
  sexChange:function(e) {
    console.log(e)
    this.setData({
      sexIndex: e.detail.value
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.avatarList,
      current: this.data.avatar
    });
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
    const access_token =  wx.getStorageSync('access_token')
    if(access_token != null && access_token != '') {
      giteeUserInfo(res => {
        if(res.statusCode === 200) {
          app.globalData.username = res.data.name
          wx.setStorageSync('avatar_url', res.data.avatar_url)
          that.setData({
            username: res.data.name,
            stared: res.data.stared,
            blog: res.data.blog,
            weibo: res.data.weibo,
            avatar_url: res.data.avatar_url,
            watched:res.data.watched
          })
        }
      })
    }
    

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