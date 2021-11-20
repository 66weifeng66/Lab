// pages/fileDetail/index.js
import {giteeBlobsRepository,giteeBreachRepository} from '../../utils/gitee.js'
import {base64_decode} from '../../utils/base64.js'
// var BASE64 = require('../../utils/base64.js');
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner:'',
    repo: '',
    text: '',
    sha: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.setData({
      owner: options.owner,
      repo: options.repo,
      sha: options.sha
    })
    //  获取指定文件内容
    giteeBlobsRepository(this.data.owner,this.data.repo,this.data.sha, res => {
      const test = base64_decode(res.data.content)
      this.setData({
        text: test
      })
    })
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