// pages/dirDetail/index.js
import {giteeRepoSomeContent,giteeBreachRepository,giteeRepoNewFile} from '../../utils/gitee.js'
import {base64_decode,encode} from '../../utils/base64.js'
const app = getApp()
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    owner:'',
    repo: '',
    sha: '',
    result: '',
    showUpload:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var flag = false
    if( options.showUpload === 'true'){
      flag = true
    }
    this.setData({
      owner: options.owner,
      repo: options.repo,
      sha: options.sha,
      showUpload: flag
    })
    this.giteeBreachRepository()
  },
  // 获取指定分支仓库信息
  giteeBreachRepository: function(){
    giteeBreachRepository(this.data.owner,this.data.repo,this.data.sha, res => {
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
      url: '/pages/dirDetail/index?owner=' + this.data.owner + '&repo=' + this.data.repo + '&sha=' + e.currentTarget.dataset.sha,
    })
  },
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
              const tempFilePath = res.tempFilePath;
              wx.saveFile({
                tempFilePath: tempFilePath,
                success (res) {
                  console.log(res)
                  const savedFilePath = res.savedFilePath
                }
              })
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
            this.giteeBreachRepository()
          })
        },
        fail(res) {
          console.error(res)
        }
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