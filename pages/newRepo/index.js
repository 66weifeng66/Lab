// pages/newRepo/index.js
import {getData,getDatap,postData,postDataP} from '../../utils/request.js'
import {giteeBuildRepo,giteeBreachSetting} from '../../utils/gitee.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    description:"",
    homepage:'',
    private: true,
    privateList: ['是','否'],
    privateIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  privateChange:function(e) {
    console.log(e)
    this.setData({
      privateIndex: e.detail.value
    })
    if(this.data.privateIndex == 0){
      this.data.private = false
    }else{
      this.data.private = true
    }
  },
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  descriptionInput: function(e) {
    this.setData({
      description: e.detail.value
    })
  },
  homepageInput: function(e) {
    this.setData({
      homepage: e.detail.value
    })
  },
  //  提交创建
  submit:function(){
    if(this.data.name == '' || this.data.name == undefined){
      wx.showToast({
        title: '请输入仓库名称',
        icon: 'error'
      })
      return
    }
    const data = {
      'name': this.data.name,
      'description': this.data.description,
      'homepage':this.data.homepage,
      'private': this.data.private,
      'auto_init': true
    }
    // 创建仓库
    giteeBuildRepo(data, res => {
      if(res.statusCode == 201){
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          success:function(){
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }else{
        wx.showToast({
          title: '创建失败',
          icon: 'error'
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