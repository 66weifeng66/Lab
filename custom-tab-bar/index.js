Component({
  options: {
    styleIsolation: 'isolated'
  },
  data: {
    selected: 0,
    color: "text-gray",
    selectedColor: "text-blue",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "cuIcon-home",
      selectedIconPath: "cuIcon-homefill",
      text: "首页"
    },
      {
        pagePath: "/pages/repository/index",
        iconPath: "cuIcon-write",
        selectedIconPath: "cuIcon-writefill",
        text: "个人仓库"
      },
     {
       pagePath: "/pages/mine/index",
       iconPath: "cuIcon-my",
       selectedIconPath: "cuIcon-myfill",
       text: "我的"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ 
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})