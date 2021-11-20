// pages/newTieBa/index.js
import {getData,getDatap,postData,putData} from '../../utils/request.js'
import {giteeUserInfo} from '../../utils/gitee.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },
  textareaBInput(e) {
    this.setData({
      comments: e.detail.value
    })
  },
  submit(){
    var data = {
      'tiebaContents': this.data.comments,
      'avatarUrl': wx.getStorageSync('avatar_url'),
      'reviewers': wx.getStorageSync('username')
    }
    postData('addTieBa',data, res =>{
      console.log(res)
      if(res.code === 200000){
        wx.showToast({
          title: '新建成功',
          icon: 'success',
          duration: 2500,
          success:function(){
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          }
        })
        that.setData({
          comments: ''
        })
      }
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