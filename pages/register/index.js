// pages/register/index.js
import {getData,getDatap,postData,postDataP} from '../../utils/request.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexIndex: null,
    sex: ['男', '女'],
    username: '',
    password: '',
    phoneNum: '',
    age: '',
    avatar: '',
    avatarList:[]
  },
  sexChange:function(e) {
    console.log(e)
    this.setData({
      sexIndex: e.detail.value
    })
  },
  submit: function() {
    wx.showModal({
      title: '提示',
      content: '确认提交注册吗，操作确认',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
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
          } else  if(that.data.phoneNum === ''){
            wx.showToast({
              title: '手机号码不能为空',
              icon:'none'
            })
            return
          } else  if(that.data.sexIndex === null){
            wx.showToast({
              title: '请选择性别',
              icon:'none'
            })
            return
          } else  if(that.data.age === ''){
            wx.showToast({
              title: '请输入年龄',
              icon:'none'
            })
            return
          }
          const user = {
            'username': that.data.username,
            'password': that.data.password,
            'phoneNumber': that.data.phoneNum,
            'sex': that.data.sex[that.data.sexIndex],
            'age': that.data.age
          }
          postData('user/register', JSON.stringify(user), res => {
            console.log(res)
            if(res.code === 200000){
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                success: function(){
                  wx.navigateTo({
                    url: '/pages/login/index',
                  })
                }
              })
            } else {
              wx.showToast({
                title: '用户已存在，请更改用户名'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://localhost:8086/file/uploadImage', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'imageName',
          success (resp){
            const res = JSON.parse(resp.data)
            console.log(res)
            const data = res.data
            const  avatarList = []
            avatarList.push('http://localhost:8086/file/downloadImageByName?filename=' + res.data)
            //do something
            console.log( data)
            that.setData({
              avatar: res.data, 
              avatarList: avatarList
            })
          }
        })
      }
    });
  },
  ViewImage(e) {
    // console.log( this.data.avatarList)
    wx.previewImage({
      urls: this.data.avatarList,
      current: 'http://localhost:8086/file/downloadImageByName?filename=' + this.data.avatar
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张头像吗？',
      cancelText: '再看看',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.avatarList.splice(0, 1);
          this.setData({
            avatar: ''
          })
        }
      }
    })
  },
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  ageInput: function(e) {
    this.setData({
      age: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  phoneNumInput: function(e) {
    this.setData({
      phoneNum: e.detail.value
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