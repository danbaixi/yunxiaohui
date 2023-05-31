Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '', // 学号
    password: '', // 密码
    saveCount: true, // 是否记住账号，默认选中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAccount()
  },

  // 初始化账号
  initAccount() {
    const accountCache = wx.getStorageSync("account")
    if (accountCache) {
      this.setData({
        ...accountCache
      })
    }
  },

  // 登录
  login() {
    const that = this
    const postData = {
      stuId: that.data.stuId,
      password: that.data.password
    }
    wx.showLoading({
      title: '登录中',
    })
    wx.request({
      url: 'http://localhost:3000/login',
      data: postData,
      method: 'POST',
      success(res){
        wx.hideLoading()
        if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return
        }
        if (that.data.saveCount) {
          wx.setStorageSync('account', postData)
        }
        wx.setStorageSync('token',res.data.data.cookie)
        if (that.data.saveCount) {
          wx.setStorageSync('account', postData)
        } else {
          wx.removeStorageSync('account')
        }
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 1500);
      }
    })
  },

  switchStatus() {
    this.setData({
      saveCount: !this.data.saveCount
    })
  }
})