//index.js
//获取应用实例
import {getData,getDatap,postData,postDataP} from '../../utils/request.js'
import {giteeSearch} from '../../utils/gitee.js'
const app = getApp()
var that
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    q: 'java',
    pageno: 1,
    per_page: 20,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    searchList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toArticleDetail: function(event){
    console.log('点击')
      console.log(event.target.dataset)
      const id = event.target.dataset.id
      wx.navigateTo({
        url: '/pages/articleDetail/index?id=' + id,
      })
  },
  onLoad: function () {
    this.giteeSearch()
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  toTieBa:function(){
    wx.navigateTo({
      url: '/pages/tieba/index',
    })
  },
  giteeSearch:function(){
    wx.showLoading({
      title: '加载中',
    })
    // 获取所有开源信息
    giteeSearch(this.data.q,this.data.pageno,this.data.per_page, res => {
      this.setData({
        searchList: res.data
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
  },
  bindinputKey:function(e){
    const key = e.detail.value
    if(key != '' && key != null){
      this.setData({
        q: key
      })
    }

  },
  searchKey: function(){
    this.setData({
      pageno: 1
    })
    // 获取所有开源信息
    giteeSearch(this.data.q,this.data.pageno,this.data.per_page, res => {
      this.setData({
        searchList: res.data
      })
    })
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) { 
    // console.info("用户上拉动作") 
    const pagenum = this.data.pageno + 1
    this.setData({
      pageno: pagenum
    })
    wx.showLoading({
      title: '加载中',
    })
    // 获取所有开源信息
    giteeSearch(this.data.q,this.data.pageno,this.data.per_page, res => {
      const resList = this.data.searchList
      const list = resList.concat(res.data)
      this.setData({
        searchList: list
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
  },
})
