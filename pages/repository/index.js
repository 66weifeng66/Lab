// pages/message/index.js
import {getData,getDatap,postData,postDataP} from '../../utils/request.js'
import {giteePersonalRepository} from '../../utils/gitee.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    q: '',
    pageno: 1,
    per_page: 20,
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
        selected: 1
      })
    }
    // 查询个人所有仓库
    giteePersonalRepository(this.data.q,this.data.pageno,this.data.per_page, res => {
      this.setData({
        searchList: res.data
      })
    })
  },
// 新建仓库
  buildRepo:function(){
    wx.navigateTo({
      url: '/pages/newRepo/index',
    })
  },
  textareaBInput(e) {
    this.setData({
      message: e.detail.value
    })
  },
  titleInput(e) {
    this.setData({
      title: e.detail.value
    })
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