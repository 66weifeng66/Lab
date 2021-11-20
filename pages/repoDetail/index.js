// pages/repoDetail/index.js
import {giteeRepoSomeContent,giteeBreachRepository,giteeRepoNewFile,giteeBreachSetting} from '../../utils/gitee.js'
import {getData,getDatap,postData,postDataP} from '../../utils/request.js'
import {base64_decode,encode} from '../../utils/base64.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    owner:'',
    repo: '',
    sha: 'master',
    result: '',
    showUpload: false,
    commentsList: [],
    comments:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    var flag = false
    if( options.showUpload === 'true'){
      flag = true
    }
    this.setData({
      id: options.id,
      owner: options.owner,
      repo: options.repo,
      showUpload: flag
    })
    console.log(options)
    // 获取指定仓库信息 
    // giteePerRepository(this.data.owner,this.data.repo, res => {
    // })
    this.getAllComments()
    this.giteeBreachRepository()
  },
  // 获取指定仓库所有评论
  getAllComments:function(){
    getData('getRepoCommentById', {'id': this.data.id}, res =>{
      console.log(res)
       this.setData({
         commentsList: res
       })
    })
  },
  // 获取指定分支仓库信息
  giteeBreachRepository: function(){
    giteeBreachRepository(this.data.owner,this.data.repo,this.data.sha, res => {
      // 仓库没有初始化 默认初始化分支为master
      if(res.statusCode == 404){
        wx.showLoading({
          title: '初始化仓库',
        })
        giteeBreachSetting(this.data.owner,this.data.repo,'master', res => {
          console.log(res)
          if(res.statusCode == 200){
            wx.showToast({
              title: '初始化成功',
            })
            giteeBreachRepository(this.data.owner,this.data.repo,this.data.sha, res => {
              const result = res.data
              console.log(result)
              this.setData({
                result: res.data
              })
            })
            wx.hideLoading()
          }else{
            wx.showToast({
              title: '初始化失败',
              icon:'error'
            })
          }
        })
        return
      }
      const result = res.data
      console.log(result)
      this.setData({
        result: res.data
      })
    })
  },
  //  查看文件详情
  toFileDetail: function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/fileDetail/index?owner=' + this.data.owner + '&repo=' + this.data.repo + '&sha=' + e.currentTarget.dataset.sha,
    })
  },
  // 下级目录
  toDirDetail: function(e){
    wx.navigateTo({
      url: '/pages/dirDetail/index?owner=' + this.data.owner + '&repo=' + this.data.repo + '&sha='
       + e.currentTarget.dataset.sha + '&showUpload=' + this.data.showUpload,
    })
  },
  // giteeRepoSomeContent
  // 下载文件
  downloadFile: function(e){
    giteeRepoSomeContent(this.data.owner,this.data.repo,e.currentTarget.dataset.path, res => {
      const resData = res.data
      // return
      wx.showModal({
        title: '提示',
        content: '确定下载吗',
        success (resu) {
          if (resu.confirm) {
            wx.downloadFile({
              url: resData.download_url,
              success:function(res){
                console.log('下载成功')
                console.log(res)
                const tempFilePath = res.tempFilePath;
                wx.saveFile({
                  tempFilePath: tempFilePath,
                  success (res) {
                    console.log(res)
                    const savedFilePath = res.savedFilePath
                    wx.openDocument({
                      filePath: savedFilePath,
                      success: function (response) {
                        wx.showToast({
                          title: '文件下载成功，打开中',
                        })
                      },
                      fail: function (res) {
                        wx.showToast({
                          title: '打开失败，请手动打开',
                        })
                      }
                    })
                  }
                })
              },
              fail: function(res){
                console.log('下载失败',res)
              }
            })
          } else if (resu.cancel) {
           
          }
        }
      })
    
    })
  },
  uploadFile: function(){
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFile = res.tempFiles[0]
        const fs = wx.getFileSystemManager()
        console.log(res)
        // 打开文件
        fs.readFile({
          filePath: tempFile.path,
          encoding: 'utf8',
          position: 0,
          success(res) {
            const fileName = tempFile.name
            const readContent = res.data
            const baseContent = encode(readContent)
            console.log(baseContent)
            giteeRepoNewFile(that.data.owner,that.data.repo,fileName,baseContent, res =>{
              // console.log(res.data)
              wx.showToast({
                title: '文件上传成功',
                icon: 'success'
              })
              this.giteeBreachRepository()
            })
          },
          fail(res) {
            console.error(res)
            wx.showToast({
              title: '文件上传失败',
              icon: 'error'
            })
          }
        })

      }
    })
  },
  textareaBInput(e) {
    this.setData({
      comments: e.detail.value
    })
  },
  // 提交评论
  submit(){
    var data = {
      'repoId': this.data.id,
      'repoComments': this.data.comments,
      'avatarUrl': wx.getStorageSync('avatar_url'),
      'reviewers': wx.getStorageSync('username')
    }
    postData('addRepoComment',data, res =>{
      console.log(res)
      if(res.code === 200000){
        that.setData({
          comments: ''
        })
        that.getAllComments()
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
    return {
      title: '开源小程序',
      path: '/pages/repoDetail/index?owner=' + this.data.owner + '&repo=' + this.data.repo + '&showUpload=false',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete:function(res){
        // 不管成功失败都会执行
      }
    }
  }
})