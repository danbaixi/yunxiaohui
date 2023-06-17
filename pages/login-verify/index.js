import {
  initLoginRequest,
  loginWithVerifyRequest
} from "../../api/main"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '', // 学号
    password: '', // 密码
    saveCount: true, // 是否记住账号，默认选中
    verifyCode: '', // 验证码
    showVerify: false, // 是否显示验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取baseUrl，用于显示验证码
    const baseUrl = app.getConfig('baseUrl')
    this.setData({
      baseUrl
    })
    this.initAccount()
    this.initLogin()
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

  // 初始化登录
  initLogin() {
    initLoginRequest().then(res => {
      this.setData({
        initData: res.data,
        showVerify: true // 显示验证码
      })
      this.downloadVerifyImg()
    })
  },

  // 下载验证码
  downloadVerifyImg() {
    const url = `${this.data.baseUrl}/login-code?cookie=${this.data.initData.cookie}`
    wx.downloadFile({
      url,
      success: (res) => {
        this.setData({
          verifyImageUrl: res.tempFilePath
        })
      }
    })
  },

  // 登录
  login() {
    const that = this
    const postData = {
      stuId: that.data.stuId,
      password: that.data.password,
      verifyCode: that.data.verifyCode,
      cookie: that.data.initData.cookie,
      formData: JSON.stringify(that.data.initData.formData),
    }
    wx.showLoading({
      title: '登录中',
    })
    loginWithVerifyRequest(postData).then(res => {
      wx.hideLoading()
      if (res.code == -1) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return
      }
      if (that.data.saveCount) {
        wx.setStorageSync('account', postData)
      }
      wx.setStorageSync('token', res.data.cookie)
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
    })
  },

  switchStatus() {
    this.setData({
      saveCount: !this.data.saveCount
    })
  }
})